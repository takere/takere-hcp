import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls
} from "react-flow-renderer";
import * as Styled from './styled';
import { Sidebar } from "../sidebar/sidebar";
import { nodeTypes } from "../nodes/nodes";
import { ConnectionLine } from "../connectionLine/connectionLine";
import { dialogFactory } from '../dialog';
import connections from "./connections.json";
import AccentSmallButton from "../buttons/AccentSmallButton";
import DotsBackground from "./DotsBackground";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Diagrams = ({ flowDb }) => {
  const [openNodeDialog, setOpenNodeDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes] = useState([]);
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

    const newNode = getDroppedNode(event);
    
    setNodes((es) => es.concat(newNode));
  };

  const getDroppedNode = (event) => {
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
      id: `dndnode_${index}`,
      type: node.type,
      position,
      data: node.data,
    };

    setIndex(index + 1);

    return newNode;
  }

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
    <Styled.Container>
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
    </Styled.Container>
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
  <Styled.FlowArea ref={reactFlowWrapper}>
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
      <DotsBackground />
      <Controls />
      <AccentSmallButton iconName='save' onClick={handleClickOpenSaveDialog} />
    </ReactFlow>
  </Styled.FlowArea>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isConnectionAllowed(sourceNodeType, targetNodeType) {
  if (connections[sourceNodeType] === undefined) {
    return false;
  }

  if (connections[targetNodeType] === undefined) {
    return false;
  }

  return connections[sourceNodeType].includes(targetNodeType);
}


function buildSaveFlowDialog(display, onClose, data) {
  if (!display) {
    return (<></>);
  }

  return dialogFactory(
    "SAVE_FLOW",
    {
      open: display,
      handleClose: onClose,
      data
    }
  );
}

function buildNodeDialog(selectedElement, openDialog, handleCloseDialog, onAddElementResultValue) {
  if (!selectedElement || !openDialog) {
    return (<></>);
  }

  return dialogFactory(
    selectedElement.type.replace("_NODE", ""),
    {
      open: openDialog,
      handleClose: handleCloseDialog,
      data: selectedElement,
      onAddElementResultValue: onAddElementResultValue
    }
  );
}
