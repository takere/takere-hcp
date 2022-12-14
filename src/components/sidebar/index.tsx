/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";
import * as Styled from "./styled";
import LocaleService from "../../services/locale.service";
import NodeService from "../../services/node.service";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const Sidebar = () => {

  const [search, setSearch] = useState("");
  const [nodes, setNodes] = useState([]);
  const [filteredElements, setFilteredElements] = useState([]);

  const localeService = new LocaleService();
  const nodeService = new NodeService();

  useEffect(() => {
    nodeService
      .getNodes()
      .then((fetchedNodes: any) => {
        setNodes(fetchedNodes);
        setFilteredElements(fetchedNodes);
      });
  }, []);

  return (
    <Styled.SideContainer>
      <Styled.SideAside>
        <Styled.NameTitle>
          { localeService.translate("ELEMENTS") }
        </Styled.NameTitle>
        <Filter 
          localeService={localeService}
          search={search}
          onSearch={(text: string) => searchNodesWithName(
            text,
            nodes,
            setSearch,
            setFilteredElements
          )}
        />
        <CarePlanElements 
          localeService={localeService}
          filteredElements={filteredElements}
          onDragStart={onDragStart}
        />
      </Styled.SideAside>
    </Styled.SideContainer>
  );
};

export default Sidebar;

const Filter = ({ localeService, search, onSearch }: any) => (
  <Styled.InputSearch
    id="outlined-basic"
    label="Filter"
    variant="outlined"
    type="search"
    value={search}
    onChange={(event: any) => onSearch(event.target.value)}
    size="small"
    placeholder={localeService.translate("FILTER")}
  />
);

const CarePlanElements = ({ 
  localeService,
  filteredElements,
  onDragStart
}: any) => {
  if (!filteredElements || filteredElements.length === 0) {
    return (
      <Styled.NameTitle style={{ textAlign: "center" }}>
        { localeService.translate("NO_ELEMENTS_FOUND") }
      </Styled.NameTitle>
    );
  }

  return (
    <Styled.List>
      <FilteredElements 
        filteredElements={filteredElements} 
        onDragStart={onDragStart} 
      />
    </Styled.List>
  );
}

const FilteredElements = ({ filteredElements, onDragStart }: any) => {
  return filteredElements.map((node: any, index: number) => (
    <Styled.SideItem
      key={index}
      onDragStart={(event) => onDragStart(event, node)}
      draggable
      bgColor={node.color}
    >
      <Styled.TitleNodeItem>{node.name}</Styled.TitleNodeItem>
      <Styled.DescriptionNodeItem>
        {node.description}
      </Styled.DescriptionNodeItem>
    </Styled.SideItem>
  ));
}


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function onDragStart(event: any, node: any) {
  event.dataTransfer.setData("application/reactflow", JSON.stringify(node));
  event.dataTransfer.effectAllowed = "move";
}

function searchNodesWithName(
  keyword: string, 
  nodes: any, 
  setSearch: any, 
  setFoundNodes: any
) {
  if (keyword !== "") {
    const results = nodes.filter((node: any) => {
      return node.name.toLowerCase().startsWith(keyword.toLowerCase());
    });

    setFoundNodes(results);
  } 
  else {
    setFoundNodes(nodes);
  }

  setSearch(keyword);
}