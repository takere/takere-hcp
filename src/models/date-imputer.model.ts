interface DateImputer {
  label: string, 
  value: string | Date, 
  onChange: (newValue: string | undefined) => void
}

export default DateImputer;
