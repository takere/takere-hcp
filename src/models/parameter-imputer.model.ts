import Parameter from "./parameter.model";


interface ParameterImputer {
  parameter: Parameter, 
  value: any, 
  onChange: (newValue: any) => void
}

export default ParameterImputer;
