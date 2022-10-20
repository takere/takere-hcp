import Page from "./page.model";
import Parameter from "./parameter.model";


interface RichTextParameter {
  parameter: Parameter
  value: Page, 
  onChange: (page: Page) => void, 
}

export default RichTextParameter;
