import * as dotenv from "dotenv";
import createServer from "./server";

dotenv.config();

const PORT = process.env.PORT || 4000;

createServer(PORT);
