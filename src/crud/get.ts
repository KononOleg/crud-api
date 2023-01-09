import users from "../users";
import { checkIfValidUUID, getId } from "../utils/utils";
import { RESPONSE_MESSAGES, STATUS_CODE } from "../utils/constants";

export const getUsers = async (_: any, res: any) =>
  res.end(JSON.stringify(users));

export const getUserById = async (req: any, res: any) => {
  const id = getId(req);
  if (checkIfValidUUID(id)) {
    const user = users.find((person) => person.id === id);
    if (user) {
      res.write(JSON.stringify(user));
    } else {
      res.writeHead(STATUS_CODE.NOT_FOUND);
      res.write(JSON.stringify({ message: RESPONSE_MESSAGES.NOT_FOUND }));
    }
  } else {
    res.writeHead(STATUS_CODE.BAD_REQUEST);
    res.write(JSON.stringify({ message: RESPONSE_MESSAGES.INVALID_USER_ID }));
  }
};
