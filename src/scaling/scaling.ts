import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import createServer from "../server";

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ WORKER_PORT: 4000 + i + 1 });
  }

  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const PORT = process.env.WORKER_PORT || 4000;
  createServer(PORT);

  console.log(`Worker ${process.pid} started on port:${PORT}`);
}
