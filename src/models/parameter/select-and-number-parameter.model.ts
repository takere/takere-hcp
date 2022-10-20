import Parameter from "./parameter.model";
import SelectAndNumberContainer from "./select-and-number-container.model";


interface SelectAndNumberParameter {
  parameter: Parameter
  value: SelectAndNumberContainer, 
  onChange: (newValue: SelectAndNumberContainer) => void, 
}

export default SelectAndNumberParameter;
