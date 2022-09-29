import IJutsu from "../models/IJutsu";
import IJutsuRepository from "./IJutsuRepository";
import { JutsusMock } from "./JutsusMock";

class JutsuRepositoryInMemory implements IJutsuRepository {
  jutsus: IJutsu[] = JutsusMock;

  async findById(id: string): Promise<IJutsu | null> {
    const jutsu = this.jutsus.find((jutsu) => jutsu._id.toString() === id);
    return !!jutsu ? jutsu : null;
  }

  async findAll(pageSize: number, page: number): Promise<IJutsu[]> {
    return this.jutsus;
  }

  async findByFilters(
    kekkeiParams: Object[],
    classificationParams: Object[],
    debutParams: Object[]
  ): Promise<IJutsu[]> {
    // let filteredJutsus = [] as IJutsu[];
    // if (!!kekkeiParams) {
    //   this.jutsus.forEach((jutsu) => {
    //     return filteredJutsus.push(
    //       jutsu.data?.kekkeiGenkai?.filter((kekkei) =>
    //         Object.values(kekkeiParams).includes(kekkei)
    //       )
    //     );
    //   });
    // }
    // return filteredJutsus;
    return this.jutsus;
  }
}

export default JutsuRepositoryInMemory;
