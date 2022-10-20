interface DateImputer {
  label: string, 
  value: string | Date, 
  helperText: string,
  onChange: (newValue: string | undefined) => void
}

export default DateImputer;
