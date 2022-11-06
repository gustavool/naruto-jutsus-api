import { Request, Response } from "express";
import { container } from "tsyringe";
import JutsuService from "../services/JutsuService";

const LIMIT_SIZE = 20;
class JutsuController {
  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = container.resolve(JutsuService);

    const jutsu = await service.findById(id);

    return res.json(jutsu);
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const limit = !!req.query.limit ? Number(req.query.limit) : LIMIT_SIZE;
    const page = !!req.query.page ? Number(req.query.page) : 0;
    const { name } = req.params;

    const service = container.resolve(JutsuService);

    const jutsu = await service.findByName(name, limit, page);

    return res.json(jutsu);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const limit = !!req.query.limit ? Number(req.query.limit) : LIMIT_SIZE;
    const page = !!req.query.page ? Number(req.query.page) : 0;

    const service = container.resolve(JutsuService);

    const jutsus = await service.findAll(limit, page);

    return res.json(jutsus);
  }

  async findByFilters(req: Request, res: Response): Promise<Response> {
    const limit = !!req.query.limit ? Number(req.query.limit) : LIMIT_SIZE;
    const page = !!req.query.page ? Number(req.query.page) : 0;
    const name = !!req.query.name ? String(req.query.name) : "";

    const kekkeiGenkais = !!req.query.kekkeiGenkais
      ? String(req.query.kekkeiGenkais)
      : "";
    const classifications = !!req.query.classifications
      ? String(req.query.classifications)
      : "";
    const debuts = !!req.query.debuts ? String(req.query.debuts) : "";
    const types = !!req.query.types ? String(req.query.types) : "";

    const service = container.resolve(JutsuService);

    const jutsus = await service.findByFilters(
      name,
      limit,
      page,
      kekkeiGenkais,
      classifications,
      debuts,
      types
    );

    return res.json(jutsus);
  }
}

export default JutsuController;
