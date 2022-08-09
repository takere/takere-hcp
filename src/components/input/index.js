import BooleanInput from "./BooleanInput";
import DateInput from "./DateInput";
import MultiSelectionInput from "./MultiSelectionInput";
import NumberInput from "./NumberInput";
import RawTextInput from "./RawTextInput";

const mapping = {
  "BooleanInput": BooleanInput,
  "DateInput": DateInput,
  "MultiSelectionInput": MultiSelectionInput,
  "Multiselect": MultiSelectionInput,
  "NumberInput": NumberInput,
  "RawTextInput": RawTextInput
};

export default mapping;
