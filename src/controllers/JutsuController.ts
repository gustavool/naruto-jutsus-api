import { Request, Response } from "express";
import JutsuService from "../services/JutsuService";

class JutsuController {
  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = new JutsuService();

    const jutsu = await service.findById(id);

    return response.json({ jutsu });
  }
}

export default JutsuController;
