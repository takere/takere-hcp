import React, { useState, useRef, useEffect, useCallback } from "react";
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
import AccentButton from "../buttons/AccentButton";
import DotsBackground from "./DotsBackground";


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
const Diagrams = ({ flowDb, nodeConnections }) => {
  const [openNodeDialog, setOpenNodeDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [flow, setFlow] = useState(null);
  const [index, setIndex] = useState(0);
  const [selectedNodeConnection, setSelectedNodeConnection] = useState({});
  const reactFlowWrapper = useRef(null);

  const handleClickOpenDialog = () => {
    console.log(nodes);
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
    const connectedNodeIds = nodes
      .filter(node => node.target === element.id)
      .map(edge => edge.source);
    const connectedNodes = nodes.filter(node => connectedNodeIds.includes(node.id))[0];
    
    setSelectedNodeConnection(connectedNodes)
    setSelectedNode(element);
    handleClickOpenDialog();
  };

  const onAddElementResultValue = (e, result) => {
    // TODO: Adaptar para funcionar com nova estrutura
    // const newElements = nodes.map((element) =>
    //   element.id === e.id
    //     ? {
    //         ...element,
    //         data: {
    //           ...element.data,
    //           results: result,
    //         },
    //       }
    //     : element
    // );
    // setNodes(newElements);
  };

  const onConnect = (
    (params) => {
      const sourceId = params.source;
      const targetId = params.target;
      const sourceNode = nodes.filter(element => element.id === sourceId)[0];
      const targetNode = nodes.filter(element => element.id === targetId)[0];

      if (isConnectionAllowed(sourceNode.slug, targetNode.slug, nodeConnections)) {
        const connectedNodes = nodes.filter(node => (!node.target) || (node.target !== targetId));

        setNodes(addEdge({ ...params, animated: true, style:{strokeWidth:3} }, connectedNodes));
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
      ...node,
      key: index,
      id: `dndnode_${index}`,
      // type: node.type,
      position,
      //data: node.data, 
      onRemove: remModelData
    };

    setIndex(index + 1);

    return newNode;
  }

  const remModelData = useCallback((id) => {
    let arr = nodes
    let idx = arr.indexOf(id);

    if (idx > -1) {
      arr.splice(idx, 1);
    }
    arr = arr.filter(function (obj) {
      return obj.id !== id;
    });
    setNodes(arr);
  }, []);

  useEffect(() => {
    if (flowDb?.data) {
      const rawNodes = flowDb.data;

      for (let i = 0; i < rawNodes.length; i++) {
        rawNodes[i] = { ...rawNodes[i], onRemove: remModelData };
      }
      setNodes(rawNodes);
      setFlow(flowDb);
    } else {
      setNodes([]);
      setFlow(null);
    }
  }, [flowDb]);

  return (
    <Styled.Container>
      { buildSaveFlowDialog(openSaveDialog, handleCloseSaveDialog, { flow, elements: nodes }) }
      { buildNodeDialog(selectedNode, openNodeDialog, handleCloseNodeDialog, onAddElementResultValue, selectedNodeConnection) }
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
      <AccentButton 
        iconName='save' 
        type='small'
        onClick={handleClickOpenSaveDialog} 
        style={{
          zIndex: "1000",
          position: "absolute",
          bottom: 0,
          right: 0,
          marginBottom: 20,
          marginRight: 20,
        }}
      />
    </ReactFlow>
  </Styled.FlowArea>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
function isConnectionAllowed(sourceNodeSlug, targetNodeSlug, nodeConnections) {
  if (nodeConnections[sourceNodeSlug] === undefined) {
    return false;
  }

  if (nodeConnections[targetNodeSlug] === undefined) {
    return false;
  }

  return nodeConnections[sourceNodeSlug].includes(targetNodeSlug);
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

function buildNodeDialog(
  selectedElement, 
  openDialog,
  handleCloseDialog, 
  onAddElementResultValue,
  selectedNodeConnection
) {
  if (!selectedElement || !openDialog) {
    return (<></>);
  }

  return dialogFactory(
    selectedElement.type,
    {
      open: openDialog,
      handleClose: handleCloseDialog,
      node: selectedElement,
      onAddElementResultValue: onAddElementResultValue,
      connection: selectedNodeConnection
    }
  );
}
