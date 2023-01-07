export class MemoNotFound extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, MemoNotFound.prototype);
  }
}
