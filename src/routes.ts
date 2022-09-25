import { Router } from "express";

import JutsuController from "./controllers/JutsuController";

const router = Router();

const jutsuController = new JutsuController();

router.get("/jutsu/:id", jutsuController.findById);

export default router;
