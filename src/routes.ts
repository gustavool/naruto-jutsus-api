import { Router } from "express";

import JutsuController from "./controllers/JutsuController";

const router = Router();

router.get("/jutsu/:id", new JutsuController().findById);

export default router;
