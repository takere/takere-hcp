import Options from "./options.model";

interface OptionBuilder {
  handleNewOption: () => void
  options: Options[], 
  onValueChange: (newValue: Options, index: number) => void, 
  handleRemoveOption: (index: number) => void
}

export default OptionBuilder;
