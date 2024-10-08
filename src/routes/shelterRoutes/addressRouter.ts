import { Router } from "express";
import errorHandle from "../../middlewares/errorHandle";
import controller from "../../controllers/shelter/addressController";
import verfifyJWT from "../../middlewares/auth";

const router: Router = Router();
const AddressController = new controller();

router.post("/create-address", AddressController.createShelterAddress);

router.use(errorHandle);

export default router;
