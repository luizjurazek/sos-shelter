import { Router } from "express";
import errorHandle from "../../middlewares/errorHandle";
import controller from "../../controllers/shelter/suppliesController";
import verfifyJWT from "../../middlewares/auth";

const router: Router = Router();
const SupplyController = new controller();

router.get("/get-supply-by-shelter-id", SupplyController.getSupplyByShelter);

router.use(errorHandle);

export default router;
