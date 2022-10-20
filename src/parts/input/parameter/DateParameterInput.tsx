/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";
import BooleanInput from "../BooleanInput";
import DateInput from "../DateInput";
import LocaleService from "../../../services/locale.service";
import DateParameter from "../../../models/parameter/date-parameter.model";


// ----------------------------------------------------------------------------
//         Components
// ----------------------------------------------------------------------------
const DateParameterInput = ({ parameter, value, onChange }: DateParameter) => {

  const [undefinedValue, setUndefinedValue] = useState(value === null);
  
  const localeService = new LocaleService();

  const onChangeUndefinedValue = (newValue: any) => {
    setUndefinedValue(newValue);
    onChange(newValue ? null : new Date().toISOString());
  }
  
  if (parameter.required) {
    if (!value) {
      onChange(new Date().toISOString())
    }

    return (
      <DateInput
        label={parameter.name}
        helperText={parameter.description}
        value={value}
        onChange={onChange}
      />
    );
  }
  else {
    return (
      <>
        {!undefinedValue &&
          <DateInput
            label={parameter.name}
            helperText={parameter.description}
            value={value}
            onChange={onChange}
          />
        }
        <BooleanInput
          label={localeService.translate("IS_UNDEFINED")}
          value={undefinedValue}
          onChange={onChangeUndefinedValue}
        />
      </>  
    );
  }
}

export default DateParameterInput;
