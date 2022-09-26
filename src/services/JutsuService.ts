import mongoose, { isValidObjectId } from "mongoose";
import IJutsu from "../interfaces/IJutsu";
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
}

export default JutsuService;
