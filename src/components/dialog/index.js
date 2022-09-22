import React from 'react';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import BeginDialog from "./begin";
import SaveFlowDialog from './save';
import ConditionalDialog from './conditional';
import DialogFactoryException from './exception/DialogFactoryException';
import GenericDialog from './generic';


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const dialogs = {
  BEGIN: BeginDialog,
  CONDITIONAL: ConditionalDialog,
  PERIODIC: GenericDialog,
  NON_PERIODIC: GenericDialog,
  SAVE_FLOW: SaveFlowDialog,
};


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


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
export function dialogFactory(type, props) {
  if (dialogs[type.toUpperCase()] === undefined) {
    throw new DialogFactoryException(`There is no support for ${type}`);
  }

  return React.createElement(dialogs[type], { ...props });
}
