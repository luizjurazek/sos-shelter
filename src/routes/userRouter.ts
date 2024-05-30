import { Router } from "express"; // Corrigido aqui
import errorHandle from "../middlewares/errorHandle";
import controller from "../controllers/userController";

const router: Router = Router();
const UserController = new controller();

router.get("/get-users", UserController.getUsers);
router.get("/get-user", UserController.getUser);
router.post("/create", UserController.createUser);

router.use(errorHandle);

export default router;
