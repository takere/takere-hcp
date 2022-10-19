import React from "react";
import parameters from "./parameter";

const ParameterInput = ({ parameter, value, onChange }) => {

  const normalizedType = normalizeParameterType(parameter.type);

  if (parameters[normalizedType] === undefined) {
    throw new Error(`There is no support for parameter ${parameter.type}`);
  }

  return React.createElement(
    parameters[normalizedType], 
    { parameter, value, onChange }
  );
}

export default ParameterInput;

function normalizeParameterType(type) {
  return type
    .replace("|", "_or_")
    .replace("&", "_and_")
    .toUpperCase();
}
