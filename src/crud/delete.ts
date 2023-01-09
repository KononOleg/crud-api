import { checkIfValidUUID, getId } from "../utils/utils";

import users from "../users";
import { RESPONSE_MESSAGES, STATUS_CODE } from "../utils/constants";

export const deleteUser = async (req: any, res: any) => {
  const id = getId(req);
  if (checkIfValidUUID(id)) {
    const userIndex = users.findIndex((person) => person.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.writeHead(STATUS_CODE.NO_CONTENT);
    } else {
      res.writeHead(STATUS_CODE.NOT_FOUND);
      res.write(JSON.stringify({ message: RESPONSE_MESSAGES.NOT_FOUND }));
    }
  } else {
    res.writeHead(STATUS_CODE.BAD_REQUEST);
    res.write(JSON.stringify({ message: RESPONSE_MESSAGES.INVALID_USER_ID }));
  }
};
