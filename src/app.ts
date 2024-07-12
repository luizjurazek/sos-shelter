import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerFile from "../swagger_output.json";

// Routers
import mainRouter from "./routes/mainRouter";

const app = express();

// setup for use json on requests
app.use(express.json());
// setup for swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Import all routes from mainRouter file
app.use(mainRouter);

export default app;
