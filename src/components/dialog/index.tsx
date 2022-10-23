/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveFlowDialog from './save';
import ConditionalDialog from './conditional';
import DialogFactoryException from './exception/DialogFactoryException';
import GenericDialog from './generic';


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
const dialogs = {
  BEGIN: GenericDialog,
  CONDITIONAL: ConditionalDialog,
  PERIODIC: GenericDialog,
  NON_PERIODIC: GenericDialog,
  SAVE_FLOW: SaveFlowDialog,
};


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
export const Header = ({ title, subtitle }: any) => (
  <DialogTitle id="max-width-dialog-title">
    { title }
    <DialogContentText>
      { subtitle }
    </DialogContentText>
  </DialogTitle>
);

export const Body = ({ children }: any) => (
  <DialogContent>
    { children }
  </DialogContent>
);

export const Footer = ({ children }: any) => (
  <DialogActions>
    { children }
  </DialogActions>
);


//-----------------------------------------------------------------------------
//        Functions
//-----------------------------------------------------------------------------
export function dialogFactory(type: string, props: any) {
  if (dialogs[type.toUpperCase() as keyof typeof dialogs] === undefined) {
    throw new DialogFactoryException(`There is no support for ${type}`);
  }

  return React.createElement(
    dialogs[type.toUpperCase() as keyof typeof dialogs], 
    { ...props }
  );
}
