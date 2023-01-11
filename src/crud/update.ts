import { RESPONSE_MESSAGES, STATUS_CODE } from "../utils/constants";
import { getId, getRequestData, isValidUser } from "../utils/utils";
import users from "../users";
import { validate as uuidValidate } from "uuid";

export const updateUser = async (req: any, res: any) => {
  const id = getId(req);

  if (uuidValidate(id)) {
    const userIndex = users.findIndex((person) => person.id === id);
    if (userIndex !== -1) {
      const { username, age, hobbies } = await getRequestData(req);
      const user = { username, age, hobbies };
      if (isValidUser(user)) {
        res.writeHead(STATUS_CODE.BAD_REQUEST);
        res.write(JSON.stringify({ message: RESPONSE_MESSAGES.INVALID_DATA }));
        return;
      }

      const newUser = { ...users[userIndex], ...user };
      users.splice(userIndex, 1, newUser);
      res.write(JSON.stringify(newUser));
    } else {
      res.writeHead(STATUS_CODE.NOT_FOUND);
      res.write(JSON.stringify({ message: RESPONSE_MESSAGES.NOT_FOUND }));
    }
  } else {
    res.writeHead(STATUS_CODE.BAD_REQUEST);
    res.write(JSON.stringify({ message: RESPONSE_MESSAGES.INVALID_USER_ID }));
  }
};
