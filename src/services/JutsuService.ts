import { isValidObjectId } from "mongoose";
import IJutsu from "../models/IJutsu";
import Jutsu from "../models/Jutsu";
import { AppError } from "../utils/AppError";

class JutsuService {
  async findById(id: string): Promise<IJutsu> {
    if (!isValidObjectId(id)) {
      throw new AppError("Id is invalid", 400);
    }

    const jutsu = await Jutsu.findById(id, "_id names.englishName description");

    if (!jutsu) {
      throw new AppError("Jutsu not found", 404);
    }

    return jutsu;
  }

  async findAll(pageSize: number, page: number): Promise<IJutsu[]> {
    console.log("pageSize", pageSize);
    console.log("page", page);
    if (!pageSize || !page) {
      console.log("entrou error");
      throw new AppError("PageSize or page params is missing", 400);
    }

    const jutsus = await Jutsu.find({}, "_id names.englishName description")
      .limit(pageSize)
      .skip(pageSize * page);

    if (!jutsus) {
      throw new AppError("Jutsus not found", 404);
    }

    return jutsus;
  }
}

export default JutsuService;
