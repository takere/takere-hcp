import Parameter from "./parameter.model";


interface SelectParameter {
  parameter: Parameter
  value: string, 
  onChange: (newValue: string) => void, 
}

export default SelectParameter;
