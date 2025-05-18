import express from "express";
import controllers from "../controllers/location.controllers.js";


const router = express.Router();

router.get("/location/", controllers.getAll);
router.get("/location/:numLoc", controllers.getOne);
router.post("/location/", controllers.create);
router.put("/location/:numLoc", controllers.updateOne);
router.delete("/location/:numLoc", controllers.deleteOne);


export default router;