import Page from "../page.model";
import Parameter from "./parameter.model";


interface BookParameter {
  parameter: Parameter,
  value: Page[], 
  onChange: (pages: Page[]) => void, 
}

export default BookParameter;
