class InputFactoryException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputFactoryException';
  }
}

export default InputFactoryException;
