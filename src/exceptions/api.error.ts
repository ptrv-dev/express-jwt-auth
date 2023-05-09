export default class ApiError extends Error {
  public status: number;
  public errors: [];

  constructor(status: number, message: string, errors: [] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  public static Unauthorized() {
    return new ApiError(401, 'Unauthorized');
  }

  public static BadRequest(message: string, errors?: []) {
    return new ApiError(400, message, errors);
  }

  public static NotFound(message: string = 'Not found', errors?: []) {
    return new ApiError(404, message, errors);
  }
}
