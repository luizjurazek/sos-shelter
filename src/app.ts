import express from "express";
import { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerFile from "../swagger_output.json";
import routerTeste from "./routes/teste";
import db from "./config/connection";

const app = express();

// setup for use json on requests
app.use(express.json());
// setup for swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routerTeste);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

db.sync()
  .then(() => {
    console.log("Banco de dados rodando");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

export default app;
