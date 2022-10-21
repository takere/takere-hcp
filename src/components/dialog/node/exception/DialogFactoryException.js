class DialogFactoryException extends Error {
  constructor(message) {
    super(message);
    this.name = 'DialogFactoryException';
  }
}

export default DialogFactoryException;
