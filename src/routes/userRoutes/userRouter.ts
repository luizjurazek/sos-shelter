import { Router } from "express";
import errorHandle from "../../middlewares/errorHandle";
import controller from "../../controllers/user/userController";

const router: Router = Router();
const UserController = new controller();

router.post("/create-user", UserController.createUser);
router.get("/get-users", UserController.getUsers);
router.get("/get-user", UserController.getUser);
router.get("/get-admin-free", UserController.getUserIsAdminAndFree);
router.put("/edit-user", UserController.editUser);
router.delete("/delete-user/:id", UserController.deleteUser);

router.use(errorHandle);

export default router;
