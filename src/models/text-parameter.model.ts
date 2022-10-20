import Parameter from "./parameter.model";


interface TextParameter {
  parameter: Parameter
  value: string, 
  onChange: (newValue: string) => void, 
}

export default TextParameter;
