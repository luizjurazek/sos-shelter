import { Router } from "express";
import errorHandle from "../middlewares/errorHandle";
import controller from "../controllers/peopleController";

const router: Router = Router();
const PeopleController = new controller();

router.post("/create-person", PeopleController.createPerson);
router.get("/get-all-people", PeopleController.getPeople);
router.get("/get-person-by-id/:id", PeopleController.getPersonById);
router.get("/get-people-by-shelter-id/:id", PeopleController.getPeopleByShelter);
router.get("/get-people-by-old-address/:address", PeopleController.getPeopleByOldAddress);
router.patch("/edit-person-by-id", PeopleController.editPerson);
router.delete("/delete-person-by-id/:id", PeopleController.deletePerson);

router.use(errorHandle);

export default router;
