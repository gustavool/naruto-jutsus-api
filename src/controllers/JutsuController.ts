import { Request, Response } from "express";
import { container } from "tsyringe";
import JutsuService from "../services/JutsuService";

const PAGE_SIZE = 20;
class JutsuController {
  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = container.resolve(JutsuService);

    const jutsu = await service.findById(id);

    return res.json({ jutsu });
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const pageSize = !!req.query.pageSize
      ? Number(req.query.pageSize)
      : PAGE_SIZE;
    const page = !!req.query.page ? Number(req.query.page) : 0;
    const { name } = req.params;

    const service = container.resolve(JutsuService);

    const jutsu = await service.findByName(name, pageSize, page);

    return res.json(jutsu);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const pageSize = !!req.query.pageSize
      ? Number(req.query.pageSize)
      : PAGE_SIZE;
    const page = !!req.query.page ? Number(req.query.page) : 0;

    const service = container.resolve(JutsuService);

    const jutsus = await service.findAll(pageSize, page);

    return res.json(jutsus);
  }

  async findByFilters(req: Request, res: Response): Promise<Response> {
    const kekkeiGenkais = !!req.query.kekkeiGenkais
      ? String(req.query.kekkeiGenkais)
      : "";
    const classifications = !!req.query.classifications
      ? String(req.query.classifications)
      : "";

    const debuts = !!req.query.debuts ? String(req.query.debuts) : "";

    const service = container.resolve(JutsuService);

    const jutsus = await service.findByFilters(
      kekkeiGenkais,
      classifications,
      debuts
    );

    return res.json({ jutsus });
  }
}

export default JutsuController;
