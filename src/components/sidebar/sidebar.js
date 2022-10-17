import React, {useEffect, useState} from 'react';
import * as Styled from './sidebar.styled';
import LocaleService from "../../services/locale.service";
import NodeService from '../../services/node.service';

const localeService = new LocaleService();
const nodeService = new NodeService();

export const Sidebar = () => {
    const [search, setSearch] = useState('');
    const [nodes, setNodes] = useState([]);
    const [foundNodes, setFoundNodes] = useState([]);
    
    
    useEffect(() => {
        nodeService.getNodes().then(r => {
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
                return node.label.toLowerCase().startsWith(keyword.toLowerCase());
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
                <Styled.NameTitle>
                {localeService.translate("ELEMENTS")}
                </Styled.NameTitle>
                <Styled.InputSearch
                    id="outlined-basic"
                    label="Filter"
                    variant="outlined"
                    type="search"
                    value={search}
                    onChange={filter}
                    size="small"
                    placeholder={localeService.translate("FILTER")}
                />
                <Styled.SideGraggAside>
                    {foundNodes && foundNodes.length > 0 ? (
                        foundNodes.map((node, index) => (
                            <Styled.SideItem 
                                key={index} 
                                onDragStart={(event) => onDragStart(event, node)} 
                                draggable
                                bgColor={node.color}
                            >
                                <Styled.TitleNodeItem>
                                    {node.name}
                                </Styled.TitleNodeItem>
                                <Styled.DescriptionNodeItem>
                                    {node.description}
                                </Styled.DescriptionNodeItem>
                            </Styled.SideItem>
                        ))
                    ) : (
                        <></>
                    )}
                </Styled.SideGraggAside>
                {
                    foundNodes.length === 0 ? <Styled.NameTitle style={{textAlign: 'center'}}>
                        {localeService.translate("NO_ELEMENTS_FOUND")}
                        </Styled.NameTitle> : <></>
                }
            </Styled.SideAside>
        </Styled.SideContainer>
    );
};
