/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RawTextInput from "./RawTextInput";
import { Spacing } from "./styled";
import AccentButton from "../../components/buttons/AccentButton";
import DangerButton from "../../components/buttons/DangerButton";
import OptionBuilder from "../../models/option-builder.model";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const OptionInputBuilder = ({ 
  handleNewOption, 
  options,
  onValueChange, 
  handleRemoveOption 
}: OptionBuilder) => (
  <div>
    <AddButton onClick={handleNewOption} />
    <Spacing />
    {options && options.map((option, index) => (
      <NewOptionField 
        key={index}
        index={index}
        option={option}
        onChange={onValueChange}
        onRemove={handleRemoveOption}
      />
    ))}
  </div>
);

export default OptionInputBuilder;

const AddButton = ({ onClick }: any) => (
  <AccentButton
    iconName='add'
    type='big'
    onClick={onClick}
    style={{
      width: '100%'
    }} 
  />
);

const NewOptionField = ({ index, option, onChange, onRemove }: any) => (
  <div>
    <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
      <OptionValue 
        label={`Option ${index+1}`}
        option={option} 
        onChange={(newValue: string) => onChange(newValue, index)} 
      />
      <RemoveButton onClick={() => onRemove(index)} />
    </div>
    <Spacing />
  </div>
);

const OptionValue = ({ label, option, onChange }: any) => (
  <RawTextInput
    label={label}
    helperText=""
    value={option.label ?? option}
    style={{marginRight: 5}}
    onChange={onChange}
  />
);

const RemoveButton = ({ onClick }: any)  => (
  <DangerButton 
      iconName='remove' 
      onClick={onClick} 
    />
);
