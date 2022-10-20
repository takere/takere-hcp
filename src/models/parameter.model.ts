import Option from "./option.model";


interface Parameter {
  slug: string,
  name: string,
  description: string,
  required: boolean,
  type: string,
  options?: Option[]
}

export default Parameter;
