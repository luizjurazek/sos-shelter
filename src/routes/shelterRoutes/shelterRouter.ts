import { Router } from "express";
import errorHandle from "../../middlewares/errorHandle";
import controller from "../../controllers/shelter/shelterController";
import verfifyJWT from "../../middlewares/auth";

const router: Router = Router();
const ShelterController = new controller();

router.post("/create-shelter", ShelterController.createShelter);
router.get("/get-shelters", ShelterController.getShelters);
router.get("/get-shelters-by-id/:id", ShelterController.getShelterById);
router.get("/get-shelters-by-city/:city", ShelterController.getSheltersByCity);
router.put("/edit-shelter", ShelterController.editShelter);
router.delete("/delete-shelter", ShelterController.deleteShelter);

router.use(errorHandle);

export default router;
