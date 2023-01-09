import server from "./server";

const PORT = 4000;

server.listen(PORT, () => {
  process.stdout.write(`Server is running on port: ${PORT}\n`);
});
