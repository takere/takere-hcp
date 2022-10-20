interface RawTextImputer {
  label: string, 
  value: string, 
  helperText: string, 
  onChange: (newValue: string) => void, 
  style?: React.CSSProperties
}

export default RawTextImputer;
