import IJutsu from "../models/IJutsu";
import Jutsu from "../models/Jutsu";
import { IResponseJutsu } from "../services/JutsuService";
import IJutsuRepository from "./IJutsuRepository";

class JutsuRepository implements IJutsuRepository {
  async findById(id: string): Promise<IJutsu | null> {
    const jutsu = await Jutsu.findById(id, { createdAt: 0 });

    return jutsu;
  }

  async findByName(
    name: string,
    pageSize: number,
    page: number
  ): Promise<IResponseJutsu> {
    const regex = new RegExp(`${name}`);
    const query = { "names.englishName": { $regex: regex, $options: "i" } };
    const jutsus = await Jutsu.find(
      query,
      "_id names.englishName images.src images.alt"
    )
      .sort({ "names.englishName": 1 })
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
      .sort({ "names.englishName": 1 })
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
    name: string,
    pageSize: number,
    page: number,
    kekkeiParams: Object[],
    classificationParams: Object[],
    debutParams: Object[],
    typeParams: Object[]
  ): Promise<IResponseJutsu> {
    const regex = new RegExp(`${name}`);
    const queryName = !!name
      ? { "names.englishName": { $regex: regex, $options: "i" } }
      : null;

    const jutsus = await Jutsu.find(
      {
        ...queryName,
        $and: [
          ...kekkeiParams,
          ...classificationParams,
          ...debutParams,
          ...typeParams,
        ],
      },
      "_id names.englishName images.src images.alt"
    )
      .sort({ "names.englishName": 1 })
      .limit(pageSize)
      .skip(pageSize * page);

    const count = await Jutsu.countDocuments({
      ...queryName,
      $and: [
        ...kekkeiParams,
        ...classificationParams,
        ...debutParams,
        ...typeParams,
      ],
    });

    return {
      total: count,
      page,
      pageSize: jutsus.length,
      jutsus: jutsus,
    };
  }
}

export default JutsuRepository;
