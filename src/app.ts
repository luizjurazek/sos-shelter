import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerFile from "../swagger_output.json";

import { sequelize } from "./config/connection";

// Routers
import userRouter from "./routes/userRouter";
import loginRouter from "./routes/loginRouter";
import shelterRouter from "./routes/shelterRouter";

const app = express();

// setup for use json on requests
app.use(express.json());
// setup for swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(loginRouter);
app.use("/user", userRouter);
app.use("/shelter", shelterRouter);

// Sync datase when start application
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.log("Has an erro while sync database: ", error);
  });

export default app;
