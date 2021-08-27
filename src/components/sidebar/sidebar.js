import React, { useState } from 'react';
import * as Styled from './sidebar.styled';
import {NODES} from "../nodes/nodes";


export const Sidebar = () => {
    const [search, setSearch] = useState('');
    const [foundNodes, setFoundNodes] = useState(NODES);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = NODES.filter((node) => {
                return node.data.label.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundNodes(results);
        } else {
            setFoundNodes(NODES);
        }

        setSearch(keyword);
    };

    return (
        <Styled.SideContainer>
            <Styled.SideAside>
                <Styled.NameTitle>Nodos</Styled.NameTitle>
                <Styled.InputSearch
                    id="outlined-basic"
                    label="Filtro"
                    variant="outlined"
                    type="search"
                    value={search}
                    onChange={filter}
                    size="small"
                    placeholder="Filtro"
                />
                <Styled.SideGraggAside>
                    {foundNodes && foundNodes.length > 0 ? (
                        foundNodes.map((node) => (
                            <Styled.SideItem key={node.id} onDragStart={(event) => onDragStart(event, node.type)} draggable>
                                <Styled.TitleNodeItem>
                                    {node.data.label}
                                </Styled.TitleNodeItem>
                                <Styled.DescriptionNodeItem>
                                    {node.data.description}
                                </Styled.DescriptionNodeItem>
                            </Styled.SideItem>
                        ))
                    ) : (
                        <></>
                    )}
                </Styled.SideGraggAside>
                {
                    foundNodes.length === 0 ? <Styled.NameTitle style={{textAlign: 'center'}}>Nenhum resultado encontrado!</Styled.NameTitle> : <></>
                }
            </Styled.SideAside>
        </Styled.SideContainer>
    );
};
