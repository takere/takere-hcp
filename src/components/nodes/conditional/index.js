import React from "react";
import { Handle } from "react-flow-renderer";
import Icon from "@material-ui/core/Icon";
import * as Styled from "./styled";
import theme from "../../../assets/themes";
import LocaleService from "../../../services/locale.service";

const ConditionalNode = (props) => {
  const nodeData = props.data;
  const localeService = new LocaleService();

  return (
    <Styled.Node bgColor={ nodeData?.color}>
      <Styled.NodeContainer>
      <Styled.DeleteButton id={"close"} onClick={() => {props?.onRemove(props?.id)}}>
          <Styled.IconItem id={"close"} fontSize="inherit">close</Styled.IconItem>
        </Styled.DeleteButton>
        <Styled.NodeName>{nodeData?.name}</Styled.NodeName>
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
      <div>
        <Styled.FlowLabel className="false">
        {localeService.translate("FALSE")}
        </Styled.FlowLabel>
        <Styled.FlowLabel className="true">
        {localeService.translate("TRUE")}
        </Styled.FlowLabel>
      </div>
      <InputHandler inputList={nodeData?.input_list} />
      <OutputHandler outputList={nodeData?.output_list} />
    </Styled.Node>
  );
};

export default ConditionalNode;

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
    transform: "rotate(-45deg)",
    borderRadius: 8,
    width: ["top", "bottom"].includes(direction) ? 20 : 12,
    height: ["top", "bottom"].includes(direction) ? 12 : 20,
    borderColor: theme.colors.night.x1,
    backgroundColor: theme.colors.night.x1,
  };

  if (direction === 'top') {
    style['left'] = '-8%';
  }
  else if (direction === 'right') {
    style['top'] = '-8%';
  }
  else if (direction === 'left') {
    style['top'] = '90%';
  }

  return style;
}
