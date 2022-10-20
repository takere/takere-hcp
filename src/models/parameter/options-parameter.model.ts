import Options from "./options.model";

interface OptionsParameter {
  value: Options[], 
  onChange: (newOptions: Options[]) => void
}


export default OptionsParameter;
