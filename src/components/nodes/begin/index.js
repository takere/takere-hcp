import React from "react";
import { Handle } from "react-flow-renderer";
import Icon from "@material-ui/core/Icon";
import * as Styled from "./styled";
import { theme } from "../../../utils/colors";

const BeginNode = (props) => {
  
  return (
    <Styled.Node bgColor={ props?.color}>
      <Styled.NodeContainer>
      <Styled.DeleteButton id={"close"} onClick={() => {props?.onRemove(props?.id)}}>
          <Styled.IconItem id={"close"} fontSize="inherit">close</Styled.IconItem>
        </Styled.DeleteButton>
        <Styled.NodeName>{props.name}</Styled.NodeName>
        <Icon
          style={{
            textAlign: "center",
            fontSize: 28,
            color: theme.colors.night.x1,
          }}
        >
          {props.icon}
        </Icon>
      </Styled.NodeContainer>
      <OutputHandler outputList={props.output_list} />
    </Styled.Node>
  );
};

export default BeginNode;


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
        style={buildStyle()}
      />
  ));
}

function buildStyle() {
  return {
    "left": "50%",
    "borderRadius": 8,
    "width": 20,
    "height": 12
  };
}

