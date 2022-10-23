/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls
} from "react-flow-renderer";
import * as Styled from './styled';
import Sidebar from "../sidebar";
import { nodeTypes } from "../nodes/nodes";
import { ConnectionLine } from "../connectionLine";
import { dialogFactory } from '../dialog';
import AccentButton from "../buttons/AccentButton";
import DotsBackground from "./DotsBackground";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Diagrams = ({ flowDb, nodeConnections }: any) => {
  
  const [openNodeDialog, setOpenNodeDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [reactFlowInstance, setReactFlowInstance]: any = useState(null);
  const [nodes, setNodes]: any = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [flow, setFlow] = useState(null);
  const [index, setIndex] = useState(0);
  const [selectedNodeConnection, setSelectedNodeConnection] = useState({});

  const reactFlowWrapper: any = useRef(null);

  useEffect(() => {
    if (flowDb?.graph) {
      const loadedNodes = formatNodes(flowDb.graph, setNodes);

      setNodes(loadedNodes);
      setFlow(flowDb);
    } 
    else {
      setNodes([]);
      setFlow(null);
    }
  }, [flowDb]);

  return (
    <Styled.Container>
      { buildSaveFlowDialog(openSaveDialog, () => handleCloseSaveDialog(setOpenSaveDialog), { flow, graph: nodes }) }
      { buildNodeDialog(selectedNode, openNodeDialog, () => handleCloseNodeDialog(setOpenNodeDialog, setSelectedNode), (e: any, result: any) => onAddElementResultValue(e, result, nodes, setNodes), selectedNodeConnection) }
      <ReactFlowProvider>
        <ReactFlowContent 
          reactFlowWrapper={reactFlowWrapper}
          elements={nodes}
          onConnect={(params: any) => onConnect(params, nodes, nodeConnections, setNodes)}
          onElementsRemove={(elements: any) => onElementsRemove(elements, setNodes)}
          onElementClick={(_: any, element: any) => onElementClick(element, setOpenNodeDialog, setSelectedNodeConnection, setSelectedNode, nodes)}
          onLoad={(instance: any) => onLoad(instance, setReactFlowInstance)}
          onDrop={(event: any) => onDrop(event, nodes, setNodes, index, setIndex, reactFlowWrapper, reactFlowInstance)}
          onDragOver={(event: any) => onDragOver(event)}
          handleClickOpenSaveDialog={() => handleClickOpenSaveDialog(setOpenSaveDialog)}
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
}: any) => (
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


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function formatNodes(nodes: any, setNodes: any) {
  const formattedNodes = [];

  for (const element of nodes) {
    let formattedData = { 
      ...element,
      data: element, 
      onRemove: (id: string) => removeNodeWithId(id, nodes, setNodes)
    };

    if (element.source !== undefined) {
      formattedData = { ...formattedData, style: { strokeWidth:3 } }
    }

    formattedNodes.push(formattedData);
  }

  return formattedNodes;
}

function removeNodeWithId(id: string, nodes: any, setNodes: any) {
  let arr = nodes
  let idx = arr.indexOf(id);

  if (idx > -1) {
    arr.splice(idx, 1);
  }
  arr = arr.filter(function (obj: any) {
    return obj.id !== id;
  });

  setNodes(arr);
}

function handleCloseSaveDialog(setOpenSaveDialog: any) {
  setOpenSaveDialog(false);
}

function onAddElementResultValue(e: any, result: any, nodes: any, setNodes: any) {
  const newElements = nodes.map((element: any) =>
    element.id === e.id
      ? {
          ...element,
          data: {
            ...element.data,
            arguments: result,
          },
        }
      : element
  );

  setNodes(newElements);
}

function handleCloseNodeDialog(setOpenNodeDialog: any, setSelectedNode: any) {
  setOpenNodeDialog(false);
  setSelectedNode(null);
}

function buildSaveFlowDialog(display: boolean, onClose: any, data: any) {
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
  selectedElement: any, 
  openDialog: boolean,
  handleCloseDialog: any, 
  onAddElementResultValue: any,
  selectedNodeConnection: any
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

function onConnect(params: any, nodes: any, nodeConnections: any, setNodes: any) {
  const sourceId = params.source;
  const targetId = params.target;
  const sourceNode = nodes.filter((element: any) => element.id === sourceId)[0];
  const targetNode = nodes.filter((element: any) => element.id === targetId)[0];

  if (isConnectionAllowed(sourceNode.data.slug, targetNode.data.slug, nodeConnections)) {
    const connectedNodes = nodes.filter((node: any) => (!node.target) || (node.target !== targetId));

    setNodes(addEdge({ ...params, animated: true, style: { strokeWidth:3 } }, connectedNodes));
  }
}

function isConnectionAllowed(
  sourceNodeSlug: string, 
  targetNodeSlug: string, 
  nodeConnections: any[]
) {
  const sourceNodeConnections = nodeConnections
    .find(connection => connection.slug === sourceNodeSlug)
    ?.connections;
  
  if (sourceNodeConnections === undefined) {
    return false;
  }

  return sourceNodeConnections.includes(targetNodeSlug);
}

function onElementsRemove(elementsToRemove: any, setNodes: any) {
  setNodes((els: any) => removeElements(elementsToRemove, els));
}

function onElementClick(element: any, setOpenNodeDialog: any, setSelectedNodeConnection: any, setSelectedNode: any, nodes: any) {
  const connectedNodeIds = nodes
    .filter((node: any) => node.target === element.id)
    .map((edge: any) => edge.source);
  const connectedNodes = nodes.filter((node: any) => connectedNodeIds.includes(node.id))[0];
  
  setSelectedNodeConnection(connectedNodes)
  setSelectedNode(element);
  handleClickOpenDialog(setOpenNodeDialog);
}

function handleClickOpenDialog(setOpenNodeDialog: any) {
  setOpenNodeDialog(true);
}

function onLoad(instance: any, setReactFlowInstance: any) {
  setReactFlowInstance(instance);
}

function onDrop(event: any, nodes: any, setNodes: any, index: any, setIndex: any, reactFlowWrapper: any, reactFlowInstance: any) {
  event.preventDefault();

  const newNode = getDroppedNode(event, nodes, setNodes, index, setIndex, reactFlowWrapper, reactFlowInstance);
  
  setNodes((es: any) => es.concat(newNode));
}

function getDroppedNode(event: any, nodes: any, setNodes: any, index: any, setIndex: any, reactFlowWrapper: any, reactFlowInstance: any) {
  if (!reactFlowWrapper || !reactFlowWrapper.current) {
    return null;
  }

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
    data: node, 
    onRemove: (id: string) => removeNodeWithId(id, nodes, setNodes)
  };

  setIndex(index + 1);

  return newNode;
}

function onDragOver(event: any) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleClickOpenSaveDialog(setOpenSaveDialog: any) {
  setOpenSaveDialog(true);
}
