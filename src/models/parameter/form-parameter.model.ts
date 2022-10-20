import Parameter from "./parameter.model";
import Options from "./options.model";

interface FormParameter {
  parameter: Parameter, 
  value: Options[], 
  onChange: (newOption: Options) => void
}

export default FormParameter;
