import express from "express";
import mongoose from "mongoose";
import listEndPoints from "express-list-endpoints";
import userRouter from "./api/index.js";

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use("/users", userRouter);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
  server.listen(port, () => {
    console.table(listEndPoints(server));
    console.log("server running on", port);
  });
});
