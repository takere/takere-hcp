import React from 'react';
import { ExplanationDialog } from "./explanation";
import { GenericDialog } from "./generic";

const dialogs = {
  EXPLANATION_NODE: ExplanationDialog,
  GENERIC_NODE: GenericDialog,
  other: GenericDialog
};

export function dialogFactory(type, props) {
  if (dialogs[type] === undefined) {
    return (<GenericDialog { ...props } />);
  }

  return React.createElement(dialogs[type], { ...props });
}
