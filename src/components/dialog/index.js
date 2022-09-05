import React from 'react';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import BeginDialog from "./begin";
import ExplanationDialog from "./explanation";
import SaveFlowDialog from './save';
import QuizDialog from './quiz';
import MedicationControlDialog from './medication-control';
import ReminderDialog from './reminder';
import OrientationDialog from './orientation';
import ConditionalDialog from './conditional';
import DialogFactoryException from './exception/DialogFactoryException';


//-----------------------------------------------------------------------------
//        Constants
//-----------------------------------------------------------------------------
const dialogs = {
  BEGIN: BeginDialog,
  EXPLANATION: ExplanationDialog,
  SAVE_FLOW: SaveFlowDialog,
  QUIZ: QuizDialog,
  MEDICATION_CONTROL: MedicationControlDialog,
  REMINDER: ReminderDialog,
  ORIENTATION: OrientationDialog,
  CONDITIONAL: ConditionalDialog
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
  if (dialogs[type] === undefined) {
    throw new DialogFactoryException(`There is no support for ${type}`);
  }

  return React.createElement(dialogs[type], { ...props });
}
