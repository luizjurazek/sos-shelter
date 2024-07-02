import { Router } from "express";
import errorHandle from "../middlewares/errorHandle";
import controller from "../controllers/shelterController";

const router: Router = Router();
const ShelterControle = new controller();

router.get("/get-shelters", ShelterControle.getShelters);
router.get("/get-shelters-by-city/:city", ShelterControle.getSheltersByCity);
router.post("/create-shelter", ShelterControle.createShelter);
router.get("/delete-shelter", ShelterControle.deleteShelter);

router.use(errorHandle);

export default router;
