import { Router } from "express";
import errorHandle from "../middlewares/errorHandle";
import controller from "../controllers/shelterController";

const router: Router = Router();
const ShelterController = new controller();

router.post("/create-shelter", ShelterController.createShelter);
router.get("/get-shelters", ShelterController.getShelters);
router.get("/get-shelters-by-city/:city", ShelterController.getSheltersByCity);
router.delete("/delete-shelter", ShelterController.deleteShelter);
router.patch("/edit-shelter", ShelterController.editShelter);

router.use(errorHandle);

export default router;
