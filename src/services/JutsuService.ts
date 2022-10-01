import { isValidObjectId } from "mongoose";
import { inject, injectable } from "tsyringe";
import IJutsu from "../models/IJutsu";
import IJutsuRepository from "../repositories/IJutsuRepository";
import { AppError } from "../utils/AppError";

@injectable()
class JutsuService {
  constructor(
    @inject("JutsuRepository") private jutsuRepository: IJutsuRepository
  ) {}

  async findById(id: string): Promise<IJutsu | null> {
    if (!isValidObjectId(id)) {
      throw new AppError("Id is invalid", 400);
    }

    const jutsu = await this.jutsuRepository.findById(id);

    if (!jutsu) {
      throw new AppError("Jutsu not found", 404);
    }

    return jutsu;
  }

  async findByName(
    name: string,
    pageSize: number,
    pageNumber: number
  ): Promise<IJutsu[]> {
    const jutsu = await this.jutsuRepository.findByName(
      name,
      pageSize,
      pageNumber
    );

    if (jutsu.length === 0) {
      throw new AppError("Jutsu not found", 404);
    }

    return jutsu;
  }

  async findAll(pageSize: number, pageNumber: number): Promise<IJutsu[]> {
    const jutsus = await this.jutsuRepository.findAll(pageSize, pageNumber);

    if (jutsus.length === 0) {
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
          return (
            !!debut && {
              [`debut.${debut.toLowerCase()}`]: { $exists: true, $ne: "" },
            }
          );
        })
      : [{}];

    const jutsus = await this.jutsuRepository.findByFilters(
      kekkeiParams,
      classificationParams,
      debutParams
    );

    if (jutsus.length === 0) {
      throw new AppError("Jutsus with filters not found", 404);
    }

    return jutsus;
  }
}

export default JutsuService;
