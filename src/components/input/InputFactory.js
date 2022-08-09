import React from 'react';
import mapping from './index';
import RawTextInput from './RawTextInput';

const InputFactory = ({ type, data }) => {
  
  if (mapping[normalizeType(type)] === undefined) {
    return (<RawTextInput { ...data } />);  
  }

  return React.createElement(mapping[normalizeType(type)], { ...data });
}

export default InputFactory;

function normalizeType(type) {
  return type
    .toLowerCase()
    .split("_")
    .map(term => capitalize(term))
    .join()
    .replaceAll(",", "")
}

function capitalize(str) {
  if (str.length === 0) {
    return str.toUpperCase();
  }

  return (str.charAt(0).toUpperCase() + str.slice(1));
}