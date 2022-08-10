import React from 'react';
import { ExplanationDialog } from "./explanation";
import { GenericDialog } from "./generic";

const dialogs = {
  EXPLANATION_NODE: ExplanationDialog,
  GENERIC_NODE: GenericDialog,
  other: GenericDialog
};

export const DialogFactory = ({ type, ...props }) => {
  if (dialogs[type] === undefined) {
    return React.createElement(dialogs["other"], props);
  }

  return React.createElement(dialogs[type], props);
}
