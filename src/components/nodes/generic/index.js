import React from "react";
import { Handle } from "react-flow-renderer";
import Icon from "@material-ui/core/Icon";
import * as Styled from "./styled";
import { theme } from "../../../utils/colors";

const GenericNode = (props) => {
  const nodeData = props.data;
  
  return (
    <Styled.Node bgColor={ nodeData?.color}>
      <Styled.NodeContainer>
      <Styled.DeleteButton id={"close"} onClick={() => {props?.onRemove(props?.id)}}>
          <Styled.IconItem id={"close"} fontSize="inherit">close</Styled.IconItem>
        </Styled.DeleteButton>
        <Styled.NodeName>
          {nodeData?.name}
        </Styled.NodeName>
        <Icon
          style={{
            textAlign: "center",
            fontSize: 28,
            color: theme.colors.night.x1,
          }}
        >
          {nodeData?.icon}
        </Icon>
      </Styled.NodeContainer>
      <InputHandler inputList={nodeData?.input_list} />
      <OutputHandler outputList={nodeData?.output_list} />
    </Styled.Node>
  );
};

export default GenericNode;

const InputHandler = ({ inputList }) => {
  if (!inputList) {
    return (<></>);
  }

  return inputList.map((direction, index) => (
    <Handle
        key={index}
        type='target'
        position={direction}
        id={`${direction}_${index}`}
        style={buildStyleForDirection(direction)}
      />
  ));
}

const OutputHandler = ({ outputList }) => {
  if (!outputList) {
    return (<></>);
  }

  return outputList.map((direction, index) => (
    <Handle
        key={index}
        type='source'
        position={direction}
        id={`${direction}_${index}`}
        style={buildStyleForDirection(direction)}
      />
  ));
}

function buildStyleForDirection(direction) {
  let style = {
    borderRadius: 8,
    width: ["top", "bottom"].includes(direction) ? 20 : 12,
    height: ["top", "bottom"].includes(direction) ? 12 : 20,
    borderColor: theme.colors.night.x1,
    backgroundColor: theme.colors.night.x1,
  };

  if ((direction === 'top') || (direction === 'bottom')) {
    style['left'] = '50%';
  }

  return style;
}