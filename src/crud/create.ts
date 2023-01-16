import { RESPONSE_MESSAGES, STATUS_CODE } from "../utils/constants";
import { getRequestData, isValidUser } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import users from "../users";

export const createUser = async (req: any, res: any) => {
  const { username, age, hobbies } = await getRequestData(req);
  const user = { username, age, hobbies };

  if (isValidUser(user)) {
    res.writeHead(STATUS_CODE.BAD_REQUEST);
    res.write(JSON.stringify({ message: RESPONSE_MESSAGES.INVALID_DATA }));
    return;
  }

  const newUser = { id: uuidv4(), ...user };
  users.push(newUser);
  res.writeHead(STATUS_CODE.CREATED);
  res.write(JSON.stringify(newUser));
};
