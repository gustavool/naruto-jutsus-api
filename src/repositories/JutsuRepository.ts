import IJutsu from "../models/IJutsu";
import Jutsu from "../models/Jutsu";
import { IResponseJutsu } from "../services/JutsuService";
import { AppError } from "../utils/AppError";
import IJutsuRepository from "./IJutsuRepository";

class JutsuRepository implements IJutsuRepository {
  async findById(id: string): Promise<IJutsu | null> {
    const jutsu = await Jutsu.findById(
      id,
      "_id names.englishName images.src images.alt"
    );

    return jutsu;
  }

  async findByName(
    name: string,
    pageSize: number,
    page: number
  ): Promise<IResponseJutsu> {
    const regex = new RegExp(`^${name}`);
    const query = { "names.englishName": { $regex: regex, $options: "i" } };
    const jutsus = await Jutsu.find(
      query,
      "_id names.englishName images.src images.alt"
    )
      .limit(pageSize)
      .skip(pageSize * page);
    const count = await Jutsu.countDocuments(query);

    return {
      total: count,
      page,
      pageSize: jutsus.length,
      jutsus: jutsus,
    };
  }

  async findAll(pageSize: number, page: number): Promise<IResponseJutsu> {
    const jutsus = await Jutsu.find(
      {},
      "_id names.englishName images.src images.alt"
    )
      .limit(pageSize)
      .skip(pageSize * page);

    const count = await Jutsu.countDocuments({});
    return {
      total: count,
      page,
      pageSize: jutsus.length,
      jutsus: jutsus,
    };
  }

  async findByFilters(
    kekkeiParams: Object[],
    classificationParams: Object[],
    debutParams: Object[]
  ): Promise<IJutsu[]> {
    const jutsus = await Jutsu.find(
      {
        $and: [...kekkeiParams, ...classificationParams, ...debutParams],
      },
      "_id names.englishName images.src images.alt"
    );

    return jutsus;
  }
}

export default JutsuRepository;
