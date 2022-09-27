import IJutsu from "../models/IJutsu";
import Jutsu from "../models/Jutsu";

class JutsuRepository {
  async findById(id: string): Promise<IJutsu | null> {
    const jutsu = await Jutsu.findById(
      id,
      "_id names.englishName images.src images.alt"
    );

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
