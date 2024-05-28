import { Router } from "express"; // Corrigido aqui
import errorHandle from "../middleware/errorHandle";
import controller from "../controller/userController";

const router: Router = Router();
const UserController = new controller();

router.post("/create", UserController.createUser);

router.use(errorHandle);

export default router;
