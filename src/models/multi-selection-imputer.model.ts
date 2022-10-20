import Option from "./option.model";


interface MultiSelectionImputer {
  label: string, 
  value: string | number, 
  helperText: string, 
  onChange: (newValue: string) => void, 
  options: Option[]
}

export default MultiSelectionImputer;
