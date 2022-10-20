import Parameter from "./parameter.model";


interface NumberParameter {
  parameter: Parameter
  value: number, 
  onChange: (newValue: number) => void, 
}

export default NumberParameter;
