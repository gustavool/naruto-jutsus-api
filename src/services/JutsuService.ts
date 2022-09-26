import { isValidObjectId } from "mongoose";
import IJutsu from "../models/IJutsu";
import Jutsu from "../models/Jutsu";
import { AppError } from "../utils/AppError";

class JutsuService {
  async findById(id: string): Promise<IJutsu> {
    if (!isValidObjectId(id)) {
      throw new AppError("Id is invalid", 400);
    }

    const jutsu = await Jutsu.findById(
      id,
      "_id names.englishName description images.src images.alt"
    );

    if (!jutsu) {
      throw new AppError("Jutsu not found", 404);
    }

    return jutsu;
  }

  async findAll(pageSize: number, page: number): Promise<IJutsu[]> {
    if (!pageSize || !page) {
      throw new AppError("PageSize and/or Page params is missing", 400);
    }

    const jutsus = await Jutsu.find(
      {
        // $and: [
        //   { "data.kekkeiGenkai": /Sharingan/i },
        //   { "data.kekkeiGenkai": /Rinnegan/i },
        // ],
      },
      "_id names.englishName images.src images.alt"
    )
      .limit(pageSize)
      .skip(pageSize * page);

    if (!jutsus) {
      throw new AppError("Jutsus not found", 404);
    }

    return jutsus;
  }

  async findByFilters(kekkeiGenkai?: string[]): Promise<IJutsu[]> {
    if (!kekkeiGenkai) {
      throw new AppError("Params is missing", 400);
    }

    const jutsus = await Jutsu.find(
      {
        $and: [
          { "data.kekkeiGenkai": /Sharingan/i },
          { "data.kekkeiGenkai": /Rinnegan/i },
        ],
      },
      "_id names.englishName images.src images.alt"
    );

    if (!jutsus) {
      throw new AppError("Jutsus with filters not found", 404);
    }

    return jutsus;
  }
}

export default JutsuService;
