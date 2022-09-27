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

    console.log("debuts", debuts);

    const debutParams = !!debuts
      ? debuts.split(",").map((debut) => {
          return !!debut && { [`debut.${debut}`]: { $exists: true, $ne: "" } };
        })
      : [{}];

    console.log("kekkeiParams", kekkeiParams);
    console.log("debutParams", debutParams);

    const jutsus = await Jutsu.find(
      {
        $and: [...kekkeiParams, ...classificationParams, ...debutParams],
      },
      "_id names.englishName images.src images.alt data.kekkeiGenkai data.classification debut"
    );

    if (!jutsus) {
      throw new AppError("Jutsus with filters not found", 404);
    }

    return jutsus;
  }
}

export default JutsuService;
