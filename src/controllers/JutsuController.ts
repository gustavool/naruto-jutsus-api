import { Request, Response } from "express";
import JutsuService from "../services/JutsuService";

class JutsuController {
  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = new JutsuService();

    const jutsu = await service.findById(id);

    return res.json({ jutsu });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const { pageSize, page } = req.query;

    const service = new JutsuService();

    const jutsus = await service.findAll(Number(pageSize), Number(page));

    return res.json({ jutsus });
  }
}

export default JutsuController;
