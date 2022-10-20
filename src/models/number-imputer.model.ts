interface NumberImputer {
  label: string, 
  value: number, 
  helperText: string,
  onChange: (newValue: number) => void
}

export default NumberImputer;
