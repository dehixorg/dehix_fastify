/*
Different type of errors that app can throw
*/

export class BadTokenError extends Error {
  constructor(
    public message: string,
    public statusCode: string,
  ) {
    super();
  }
}
export class UnAuthorisedError extends Error {
  constructor(
    public message: string,
    public statusCode: string,
  ) {
    super();
  }
}
export class DataValidationError extends Error {
  constructor(
    public message: string,
    public statusCode: string,
    public data?: any,
  ) {
    super();
  }
}
export class ServerError extends Error {
  constructor(
    public message: string,
    public statusCode: string,
  ) {
    super();
  }
}

export class NotFoundError extends Error {
  constructor(
    public message: string,
    public statusCode: string,
  ) {
    super();
  }
}
export class CreationError extends Error {
  constructor(
    public message: string,
    public statusCode: string,
  ) {
    super();
  }
}
export class BadRequestError extends Error {
  constructor(
    public message: string,
    public statusCode: string,
  ) {
    super();
  }
}

export class ConflictError extends Error {
  constructor(
    public message: string,
    public statusCode: string,
  ) {
    super();
  }
}
