import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
} from "react-flow-renderer";
import "./dnd.css";
import { Sidebar } from "../sidebar/sidebar";
import { theme } from "../../utils/colors";
import { nodeTypes } from "../nodes/nodes";
import { ConnectionLine } from "../connectionLine/connectionLine";
import Button from "@material-ui/core/Button";
import { SaveDialogPop } from "../dialog/saveDialog";
import Icon from "@material-ui/core/Icon";
import { dialogFactory } from '../dialog';
import { isConnectionAllowed } from "./connections";


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const initialElements = [];

let id = 0;
const getId = () => `dndnode_${id++}`;


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Diagrams = ({ flowDb }) => {
  const [openNodeDialog, setOpenNodeDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes] = useState(initialElements);
  const [selectedNode, setSelectedNode] = useState(null);
  const [flow, setFlow] = useState(null);
  const [index, setIndex] = useState(0);
  const reactFlowWrapper = useRef(null);

  const handleClickOpenDialog = () => {
    setOpenNodeDialog(true);
  };

  const handleClickOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  const handleCloseNodeDialog = () => {
    setOpenNodeDialog(false);
    setSelectedNode(null);
  };

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  const onElementClick = (event, element) => {
    setSelectedNode(element);
    handleClickOpenDialog();
  };

  const onAddElementResultValue = (e, result) => {
    const newElements = nodes.map((element) =>
      element.id === e.id
        ? {
            ...element,
            data: {
              ...element.data,
              results: result,
            },
          }
        : element
    );
    setNodes(newElements);
  };

  const onConnect = (
    (params) => {
      const sourceId = params.source;
      const targetId = params.target;
      const sourceNode = nodes.filter(element => element.id === sourceId)[0];
      const targetNode = nodes.filter(element => element.id === targetId)[0];

      if (isConnectionAllowed(sourceNode.type, targetNode.type)) {
        setNodes((els) => addEdge({ ...params, animated: true }, els))
      }
    }
  );

  const onElementsRemove = (elementsToRemove) => {
    setNodes((els) => removeElements(elementsToRemove, els));
  }

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const node = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      key: index,
      id: getId(),
      type: node.type,
      position,
      data: node.data,
    };
    setIndex(index + 1);
    setNodes((es) => es.concat(newNode));
  };

  useEffect(() => {
    if (flowDb?.data) {
      setNodes(flowDb.data);
      setFlow(flowDb);
    } else {
      setNodes([]);
      setFlow(null);
    }
  }, [flowDb]);

  return (
    <div className="dndflow">
      { buildSaveFlowDialog(openSaveDialog, handleCloseSaveDialog, { flow, elements: nodes }) }
      { buildNodeDialog(selectedNode, openNodeDialog, handleCloseNodeDialog, onAddElementResultValue) }
      <ReactFlowProvider>
        <ReactFlowContent 
          reactFlowWrapper={reactFlowWrapper}
          elements={nodes}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onElementClick={onElementClick}
          onLoad={onLoad}
          onDrop={onDrop}
          onDragOver={onDragOver}
          handleClickOpenSaveDialog={handleClickOpenSaveDialog}
        />
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default Diagrams;

const ReactFlowContent = ({ 
  reactFlowWrapper,
  elements,
  onConnect,
  onElementsRemove,
  onElementClick,
  onLoad,
  onDrop,
  onDragOver,
  handleClickOpenSaveDialog
}) => (
  <div className="reactflow-wrapper" ref={reactFlowWrapper}>
    <ReactFlow
      nodeTypes={nodeTypes}
      elements={elements}
      onConnect={onConnect}
      onElementsRemove={onElementsRemove}
      connectionLineComponent={ConnectionLine}
      onElementClick={onElementClick}
      onLoad={onLoad}
      onDrop={onDrop}
      onDragOver={onDragOver}
      deleteKeyCode={46}
    >
      <Background
        variant="dots"
        color={theme.colors.night.x1}
        style={{ backgroundColor: theme.colors.day.x1 }}
        gap={40}
        size={1}
      />
      <Controls />

      <Button
        style={{
          zIndex: "1000",
          position: "absolute",
          bottom: 0,
          right: 0,
          marginBottom: 20,
          marginRight: 20,
          backgroundColor: theme.colors.primary.x1,
          width: "50px",
        }}
        onClick={handleClickOpenSaveDialog}
        variant="contained"
      >
        <Icon
          style={{
            textAlign: "center",
            fontSize: 28,
            color: theme.colors.night.x1,
          }}
        >
          save
        </Icon>
      </Button>
    </ReactFlow>
  </div>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function buildSaveFlowDialog(display, onClose, data) {
  if (!display) {
    return (<></>);
  }

  return (
    <SaveDialogPop
      open={display}
      handleClose={onClose}
      data={data}
    />
  );
}

function buildNodeDialog(selectedElement, openDialog, handleCloseDialog, onAddElementResultValue) {
  if (!selectedElement || !openDialog) {
    return (<></>);
  }

  return dialogFactory(
    selectedElement.type,
    {
      open: openDialog,
      handleClose: handleCloseDialog,
      data: selectedElement,
      onAddElementResultValue: onAddElementResultValue
    }
  );
}
