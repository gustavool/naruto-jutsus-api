import { Request, Response } from "express";
import JutsuService from "../services/JutsuService";

class JutsuController {
  async findById(request: Request, response: Response): Promise<Response> {
    console.log("chamou controller");
    const { id } = request.params;

    const service = new JutsuService();

    const jutsu = await service.findById(id);

    console.log("jutsu controller", jutsu);

    if (!jutsu) {
      return response.json({
        message: "Jutsu not found",
      });
    }

    return response.json({ jutsu });
  }
}

export default JutsuController;
