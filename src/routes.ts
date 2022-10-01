import { Router } from "express";

import JutsuController from "./controllers/JutsuController";

const router = Router();

router.get("/jutsu/id/:id", new JutsuController().findById);
router.get("/jutsu/name/:name", new JutsuController().findByName);
router.get("/jutsus", new JutsuController().findAll);
router.get("/jutsus/filters", new JutsuController().findByFilters);

export default router;
