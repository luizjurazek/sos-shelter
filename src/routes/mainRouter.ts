import { Router } from "express";
import loginRouter from "../routes/loginRouter";
import peopleRouter from "../routes/peopleRouter";
import shelterRouter from "../routes/peopleRouter";
import userRouter from "../routes/userRouter";

const mainRouter: Router = Router();

mainRouter.use(loginRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/shelter", shelterRouter);
mainRouter.use("/people", peopleRouter);

export default mainRouter;
