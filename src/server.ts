import http from "http";
import { createUser } from "./crud/create";
import { deleteUser } from "./crud/delete";
import { getUserById, getUsers } from "./crud/get";
import { updateUser } from "./crud/update";
import { RESPONSE_MESSAGES, STATUS_CODE } from "./utils/constants";
import { checkPath } from "./utils/utils";

const createServer = (port: string | number) => {
  const server = http
    .createServer(async (req, res) => {
      try {
        res.setHeader("Content-type", "application/json");
        if (req.url) {
          if (req.url === "/api/users" && req.method === "GET") {
            await getUsers(req, res);
          } else if (checkPath(req.url as string) && req.method === "GET") {
            await getUserById(req, res);
          } else if (req.url === "/api/users" && req.method === "POST") {
            await createUser(req, res);
          } else if (checkPath(req.url as string) && req.method === "PUT") {
            await updateUser(req, res);
          } else if (checkPath(req.url as string) && req.method === "DELETE") {
            await deleteUser(req, res);
          } else {
            res.writeHead(STATUS_CODE.NOT_FOUND);
            res.write(
              JSON.stringify({
                message: RESPONSE_MESSAGES.NON_EXISTING_ENDPOINT,
              })
            );
          }
        }
      } catch {
        res.writeHead(STATUS_CODE.SERVER_ERROR);
        res.write(JSON.stringify({ message: RESPONSE_MESSAGES.SERVER_ERROR }));
      }
      res.end();
    })
    .listen(port, () => {
      process.stdout.write(`Server is running on port: ${port}\n`);
    });
  return server;
};

export default createServer;
