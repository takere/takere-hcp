/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Handle } from "react-flow-renderer";
import * as Styled from "./styled";
import theme from "../../../assets/themes";
import { rotationByShape } from "../shape";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const GenericNode = ({ data, onRemove, id, SpecificNodeInformation }: any) => (
  <Styled.Node bgColor={data?.color} shape={data?.shape}>
    <Styled.NodeContainer shape={data?.shape}>
      <CloseButton onClick={() => onRemove(id)} />
      <Styled.NodeName>
        { data?.name }
      </Styled.NodeName>
      <Styled.NodeIcon>
        {data?.icon}
      </Styled.NodeIcon>
    </Styled.NodeContainer>
    { SpecificNodeInformation }
    <InputHandler inputList={data?.input_list} shape={data?.shape} />
    <OutputHandler outputList={data?.output_list} shape={data?.shape} />
  </Styled.Node>
);

export default GenericNode;

const CloseButton = ({ onClick }: any) => (
  <Styled.DeleteButton
    id={"close"}
    onClick={onClick}
  >
    <Styled.IconItem id={"close"} fontSize="inherit">
      close
    </Styled.IconItem>
  </Styled.DeleteButton>
);

const InputHandler = ({ inputList, shape }: any) => {
  if (!inputList) {
    return <></>;
  }

  return inputList.map((direction: string, index: number) => (
    <Handle
      key={index}
      type="target"
      position={direction}
      id={`${direction}_${index}`}
      style={buildStyleForDirection(direction, shape)}
    />
  ));
};

const OutputHandler = ({ outputList, shape }: any) => {
  if (!outputList) {
    return <></>;
  }

  return outputList.map((direction: string, index: number) => (
    <Handle
      key={index}
      type="source"
      position={direction}
      id={`${direction}_${index}`}
      style={buildStyleForDirection(direction, shape)}
    />
  ));
};


// ----------------------------------------------------------------------------
//         Functions
// ----------------------------------------------------------------------------
function buildStyleForDirection(direction: string, shape: string) {
  let style: any = {
    transform: `rotate(-${rotationByShape[shape as keyof typeof rotationByShape]}deg)`,
    borderRadius: 8,
    width: ["top", "bottom"].includes(direction) ? 20 : 12,
    height: ["top", "bottom"].includes(direction) ? 12 : 20,
    borderColor: theme.colors.night.x1,
    backgroundColor: theme.colors.night.x1,
  };

  if (shape === 'square') {
    if (direction === "top" || direction === "bottom") {
      style["left" as keyof typeof style] = "50%";
    }
  }
  else if (shape === 'diamond') {
    if (direction === 'top') {
      style['left' as keyof typeof style] = '-8%';
    }
    else if (direction === 'right') {
      style['top' as keyof typeof style] = '-8%';
    }
    else if (direction === 'left') {
      style['top' as keyof typeof style] = '90%';
    }
  }

  return style;
}
