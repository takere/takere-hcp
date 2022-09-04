import React, {useEffect, useState} from 'react';
import * as Styled from './sidebar.styled';
import {Requests} from "../../services/axios/requests";


export const Sidebar = () => {
    const [search, setSearch] = useState('');
    const [nodes, setNodes] = useState([]);
    const [foundNodes, setFoundNodes] = useState([]);

    useEffect(() => {
        new Requests().getNodes().then(r => {
            console.log(r)
            setNodes(r);
            setFoundNodes(r);
        })
    }, []);

    const onDragStart = (event, node) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
        event.dataTransfer.effectAllowed = 'move';
    };

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = nodes.filter((node) => {
                return node.data.label.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundNodes(results);
        } else {
            setFoundNodes(nodes);
        }

        setSearch(keyword);
    };

    return (
        <Styled.SideContainer>
            <Styled.SideAside>
                <Styled.NameTitle>Elements</Styled.NameTitle>
                <Styled.InputSearch
                    id="outlined-basic"
                    label="Filter"
                    variant="outlined"
                    type="search"
                    value={search}
                    onChange={filter}
                    size="small"
                    placeholder="Filter"
                />
                <Styled.SideGraggAside>
                    {foundNodes && foundNodes.length > 0 ? (
                        foundNodes.map((node, index) => (
                            <Styled.SideItem 
                                key={index} 
                                onDragStart={(event) => onDragStart(event, node)} 
                                draggable
                                bgColor={node.data.bgColor}
                            >
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
