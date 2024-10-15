import { Router } from "express";
import loginRouter from "./userRoutes/loginRouter";
import peopleRouter from "./peopleRoutes/peopleRouter";
import shelterRouter from "./shelterRoutes/shelterRouter";
import addressRouter from "./shelterRoutes/addressRouter";
import supplyRouter from "./shelterRoutes/supplyRouter";
import userRouter from "./userRoutes/userRouter";

const mainRouter: Router = Router();

mainRouter.use(loginRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/shelter", shelterRouter);
mainRouter.use("/shelter", addressRouter);
mainRouter.use("/shelter", supplyRouter);
mainRouter.use("/people", peopleRouter);

export default mainRouter;
