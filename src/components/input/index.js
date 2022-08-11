import BooleanInput from "./BooleanInput";
import DateInput from "./DateInput";
import MultiSelectionInput from "./MultiSelectionInput";
import NumberInput from "./NumberInput";
import RawTextInput from "./RawTextInput";
import RichTextInput from "./RichTextInput";

const mapping = {
  "BooleanInput": BooleanInput,
  "DateInput": DateInput,
  "MultiSelectionInput": MultiSelectionInput,
  "Multiselect": MultiSelectionInput,
  "NumberInput": NumberInput,
  "RawTextInput": RawTextInput,
  "RichTextInput": RichTextInput
};

export default mapping;
