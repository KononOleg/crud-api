import { createServer } from "http";
import { RESPONSE_MESSAGES, STATUS_CODE } from "./utils/constants";
import { checkPath } from "./utils/utils";

const server = createServer(async (req, res) => {
  try {
    res.setHeader("Content-type", "application/json");
    if (req.url) {
      if (req.url === "/api/users" && req.method === "GET") {
        // GET USERS
      } else if (checkPath(req.url as string) && req.method === "GET") {
        // GET USER
      } else if (req.url === "/api/users" && req.method === "POST") {
        // CREATE USER
      } else if (checkPath(req.url as string) && req.method === "PUT") {
        // UPDATE USER
      } else if (checkPath(req.url as string) && req.method === "DELETE") {
        // DELETE USER
      } else {
        res.writeHead(STATUS_CODE.NOT_FOUND);
        res.write(
          JSON.stringify({ message: RESPONSE_MESSAGES.NON_EXISTING_ENDPOINT })
        );
      }
    }
  } catch {
    res.writeHead(STATUS_CODE.SERVER_ERROR);
    res.write(JSON.stringify({ message: RESPONSE_MESSAGES.SERVER_ERROR }));
  }
  res.end();
});

export default server;
