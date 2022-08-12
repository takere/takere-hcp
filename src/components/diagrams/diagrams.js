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
import { NodeTypes } from "../nodes/nodes";
import { ConnectionLine } from "../connectionLine/connectionLine";
import Button from "@material-ui/core/Button";
import { SaveDialogPop } from "../dialog/saveDialog";
import Icon from "@material-ui/core/Icon";
import { dialogFactory } from '../dialog';
import { isConnectionAllowed } from "./connections";

const initialElements = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Diagrams = ({ flowDb }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [selectedElement, setSelectedElement] = useState(null);
  const [flow, setFlow] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (flowDb?.data) {
      setElements(flowDb.data);
      setFlow(flowDb);
    } else {
      setElements([]);
      setFlow(null);
    }
  }, [flowDb]);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClickOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedElement(null);
  };

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  const onElementClick = (event, element) => {
    setSelectedElement(element);
    handleClickOpenDialog();
  };

  const onAddElementResultValue = (e, result) => {
    const newElements = elements.map((element) =>
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
    setElements(newElements);
  };

  const onConnect = (
    (params) => {
      const sourceId = params.source;
      const targetId = params.target;
      const sourceNode = elements.filter(element => element.id === sourceId)[0];
      const targetNode = elements.filter(element => element.id === targetId)[0];

      if (isConnectionAllowed(sourceNode.type, targetNode.type)) {
        setElements((els) => addEdge({ ...params, animated: true }, els))
      }
    }
  );

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const [captureElementClick, setCaptureElementClick] = useState(false);

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
    setElements((es) => es.concat(newNode));
  };

  return (
    <div className="dndflow">
      {openSaveDialog && (
        <SaveDialogPop
          open={openSaveDialog}
          handleClose={handleCloseSaveDialog}
          data={{ flow, elements }}
        />
      )}
      {
        selectedElement && openDialog && 
        dialogFactory(
          selectedElement.type,
          {
            open: openDialog,
            handleClose: handleCloseDialog,
            data: selectedElement,
            onAddElementResultValue: onAddElementResultValue
          }
        )
      }
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={NodeTypes}
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
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default Diagrams;
