import React from 'react';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ExplanationDialog } from "./explanation";
import { GenericDialog } from "./generic";
import { SaveFlowDialog } from './save';


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const dialogs = {
  EXPLANATION: ExplanationDialog,
  GENERIC: GenericDialog,
  SAVE_FLOW: SaveFlowDialog
};


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
export function dialogFactory(type, props) {
  if (dialogs[type] === undefined) {
    return (<GenericDialog { ...props } />);
  }

  return React.createElement(dialogs[type], { ...props });
}


//-----------------------------------------------------------------------------
//        Components
//-----------------------------------------------------------------------------
export const Header = ({ title, subtitle }) => (
  <DialogTitle id="max-width-dialog-title">
    { title }
    <DialogContentText>
      { subtitle }
    </DialogContentText>
  </DialogTitle>
);

export const Body = ({ children }) => (
  <DialogContent>
    { children }
  </DialogContent>
);

export const Footer = ({ children }) => (
  <DialogActions>
    { children }
  </DialogActions>
);