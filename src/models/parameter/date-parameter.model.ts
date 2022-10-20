import Parameter from "./parameter.model";

interface DateParameter {
  parameter: Parameter
  value: string | Date, 
  onChange: (newValue: string | undefined | null) => void, 
}

export default DateParameter;
