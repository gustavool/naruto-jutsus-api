import IJutsu from "../models/IJutsu";
import Jutsu from "../models/Jutsu";
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
  ): Promise<IJutsu[]> {
    const regex = new RegExp(`^${name}`);
    const jutsu = await Jutsu.find(
      { "names.englishName": { $regex: regex, $options: "i" } },
      "_id names.englishName images.src images.alt"
    )
      .limit(pageSize)
      .skip(pageSize * page);

    return jutsu;
  }

  async findAll(pageSize: number, page: number): Promise<IJutsu[]> {
    const jutsus = await Jutsu.find(
      {},
      "_id names.englishName images.src images.alt"
    )
      .limit(pageSize)
      .skip(pageSize * page);

    return jutsus;
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
