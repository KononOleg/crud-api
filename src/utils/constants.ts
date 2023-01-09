export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGES = {
  NON_EXISTING_ENDPOINT: "You entered a non-existent endpoint",
  SERVER_ERROR: "500 Internal Server Error",
  NOT_FOUND: "User not found",
  INVALID_USER_ID: "userId is invalid (not uuid)",
  INVALID_DATA:
    "Users have following properties - username (string), age (number and age > 0), hobbies (array of strings or empty array)",
};
