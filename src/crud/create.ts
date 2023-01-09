import { RESPONSE_MESSAGES, STATUS_CODE } from "../utils/constants";
import { getRequestData } from "../utils/utils";
import { uuid } from "uuidv4";
import users from "../users";

export const createUser = async (req: any, res: any) => {
  const { username, age, hobbies } = await getRequestData(req);
  const user = { username, age, hobbies };

  const isStringsArray = (arr: any[]) =>
    arr.every((i) => typeof i === "string");

  if (
    typeof username !== "string" ||
    typeof age !== "number" ||
    age < 1 ||
    !Array.isArray(hobbies) ||
    !isStringsArray(hobbies)
  ) {
    res.writeHead(STATUS_CODE.BAD_REQUEST);
    res.write(JSON.stringify({ message: RESPONSE_MESSAGES.INVALID_DATA }));

    return;
  }

  const newUser = { id: uuid(), ...user };
  users.push(newUser);
  res.writeHead(STATUS_CODE.CREATED);
  res.write(JSON.stringify(newUser));
};
