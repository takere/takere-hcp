import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
    Background
} from 'react-flow-renderer';


import './dnd.css';
import {Sidebar} from "../sidebar/sidebar";
import {theme} from "../../utils/colors";
import {getDataByNode, NodeTypes} from "../nodes/nodes";
import {ConnectionLine} from "../connectionLine/connectionLine";
import { DialogPop } from "../dialog/dialog"

const initialElements = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Diagrams = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const [selectedElement, setSelectedElement] = useState(null);


    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedElement(null);
    };

    const onElementClick = (event, element) => {
        setSelectedElement(element);
        handleClickOpenDialog()
    }


    const onConnect = useCallback(
        (params) =>
            setElements((els) =>
                addEdge({ ...params, animated: true }, els)
            ),
        []
    );
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    const [captureElementClick, setCaptureElementClick] = useState(false);

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: getId(),
            type,
            position,
            data: getDataByNode(type),
        };

        setElements((es) => es.concat(newNode));
    };

    return (
        <div className="dndflow">
            { selectedElement && openDialog && <DialogPop open={openDialog} handleClose={handleCloseDialog} data={selectedElement} /> }
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
                            style={{backgroundColor: theme.colors.day.x1}}
                            gap={40}
                            size={1}
                        />
                        <Controls />
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
};

export default Diagrams;