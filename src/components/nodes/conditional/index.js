import React from "react";
import { Handle } from "react-flow-renderer";
import Icon from "@material-ui/core/Icon";
import * as Styled from "./styled";
import { theme } from "../../../utils/colors";

const ConditionalNode = (props) => {
  return (
    <Styled.Node bgColor={ props?.data?.bgColor}>
      <Styled.NodeContainer>
      <Styled.DeleteButton id={"close"} onClick={() => {props?.data?.onRemove(props?.data?.id)}}>
          <Styled.IconItem id={"close"} fontSize="inherit">close</Styled.IconItem>
        </Styled.DeleteButton>
        <Styled.NodeName>{props.data.label}</Styled.NodeName>
        <Icon
          style={{
            textAlign: "center",
            fontSize: 28,
            color: theme.colors.night.x1,
          }}
        >
          {props.data.icon}
        </Icon>
      </Styled.NodeContainer>
      <div>
        <Styled.FlowLabel className="false">False</Styled.FlowLabel>
        <Styled.FlowLabel className="true">True</Styled.FlowLabel>
      </div>
      {props?.data?.handles &&
        props?.data?.handles.map((h, i) => {
          return (
            <Handle
              key={i}
              type={h.type}
              position={h.position}
              id={h.id}
              style={{
                ...h.style,
                borderColor: theme.colors.night.x1,
                backgroundColor: theme.colors.night.x1,
              }}
            />
          );
        })}
    </Styled.Node>
  );
};

export default ConditionalNode;