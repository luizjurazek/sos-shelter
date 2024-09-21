import { Router } from "express";
import errorHandle from "../../middlewares/errorHandle";
import Controller from "../../controllers/user/loginController";

const router: Router = Router();
const LoginController = new Controller();

router.post("/login", LoginController.login);
router.get("/logout", LoginController.logout);
router.use(errorHandle);

export default router;
