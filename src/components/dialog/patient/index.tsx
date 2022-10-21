/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DialogMaterialUI from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DefaultButton from "../../buttons/DefaultButton";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const PatientDialog = ({ open, onClose, data }: any) => (
  <DialogMaterialUI
    fullWidth={true}
    style={{backgroundColor: 'rgba(0,0,0,0.7)'}}
    maxWidth={"md"}
    open={open}
    onClose={onClose}
    aria-labelledby="max-width-dialog-title"
  >
    <Header 
      title='Details' 
      subtitle={`completed at ${data.progress?.date}`}
    />
    <Body>
      { buildDialogBody(data.node, data.progress?.answers) }
    </Body>
    <Footer>
      <DefaultButton title="Close" onClick={onClose} />
    </Footer>
  </DialogMaterialUI>
);

export default PatientDialog;

const Header = ({ title, subtitle }: any) => (
  <DialogTitle id="max-width-dialog-title">
    { title }
    <DialogContentText>
      { subtitle }
    </DialogContentText>
  </DialogTitle>
);

const Body = ({ children }: any) => (
  <DialogContent>
    { children }
  </DialogContent>
);

const Footer = ({ children }: any) => (
  <DialogActions>
    { children }
  </DialogActions>
);

const buildDialogBody = (node: any, answers: any) => {
  if (node && node.arguments && answers) {
    const questionsIndex = node.parameters.findIndex((parameter: any) => parameter.type === 'form');
    const questions = node.arguments[questionsIndex];

    return (
      <Styled.Fields>
        {answers.map((answer: any, index: number) => (
        <Styled.Field key={index}>
          <Styled.FieldTitle>
            {questions[index].label}
          </Styled.FieldTitle>
          <Styled.FieldContent>
            {answer}
          </Styled.FieldContent>
        </Styled.Field>
        ))}
      </Styled.Fields>
    );
  }
}
