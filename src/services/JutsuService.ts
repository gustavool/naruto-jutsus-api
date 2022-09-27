import { isValidObjectId } from "mongoose";
import IJutsu from "../models/IJutsu";
import Jutsu from "../models/Jutsu";
import JutsuRepository from "../repositories/JutsuRepository";
import { AppError } from "../utils/AppError";

class JutsuService {
  async findById(id: string): Promise<IJutsu | null> {
    if (!isValidObjectId(id)) {
      throw new AppError("Id is invalid", 400);
    }

    const repository = new JutsuRepository();

    const jutsu = repository.findById(id);

    if (!jutsu) {
      throw new AppError("Jutsu not found", 404);
    }

    return jutsu;
  }

  async findAll(pageSize: number, page: number): Promise<IJutsu[]> {
    if (!pageSize || !page) {
      throw new AppError("PageSize and/or Page params is missing", 400);
    }

    const repository = new JutsuRepository();

    const jutsus = repository.findAll(pageSize, page);

    if (!jutsus) {
      throw new AppError("Jutsus not found", 404);
    }

    return jutsus;
  }

  async findByFilters(
    kekkeiGenkais: string,
    classifications: string,
    debuts: string
  ): Promise<IJutsu[]> {
    if (!kekkeiGenkais && !classifications && !debuts) {
      throw new AppError("Filters is missing", 400);
    }

    const kekkeiParams = !!kekkeiGenkais
      ? kekkeiGenkais.split(",").map((kekkeiGenkai) => {
          return !!kekkeiGenkai && { "data.kekkeiGenkai": kekkeiGenkai };
        })
      : [{}];

    const classificationParams = !!classifications
      ? classifications.split(",").map((classification) => {
          return !!classification && { "data.classification": classification };
        })
      : [{}];

    const debutParams = !!debuts
      ? debuts.split(",").map((debut) => {
          return !!debut && { [`debut.${debut}`]: { $exists: true, $ne: "" } };
        })
      : [{}];

    const repository = new JutsuRepository();

    const jutsus = repository.findByFilters(
      kekkeiParams,
      classificationParams,
      debutParams
    );

    if (!jutsus) {
      throw new AppError("Jutsus with filters not found", 404);
    }

    return jutsus;
  }
}

export default JutsuService;
