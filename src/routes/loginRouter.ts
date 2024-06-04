import { Router } from "express";
import errorHandle from "../middlewares/errorHandle";
import Controller from "../controllers/loginController";

const router: Router = Router();
const LoginController = new Controller();

router.get("/login", LoginController.login);
router.use(errorHandle);

export default router;
