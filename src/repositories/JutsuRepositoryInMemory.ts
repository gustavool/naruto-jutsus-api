import IJutsu from "../models/IJutsu";
import { IResponseJutsu } from "../services/JutsuService";
import {
  checkClassification,
  checkDebut,
  checkKekkei,
} from "../utils/checkParamsJutsu";
import IJutsuRepository from "./IJutsuRepository";
import { JutsusMock } from "./JutsusMock";

export interface IKekkeiParams {
  "data.kekkeiGenkai": string;
}

export interface IClassificationParams {
  "data.classification": string;
}

class JutsuRepositoryInMemory implements IJutsuRepository {
  jutsus: IJutsu[] = JutsusMock;

  async findByName(
    name: string,
    limit: number,
    page: number
  ): Promise<IResponseJutsu> {
    const jutsusDocs = this.jutsus.filter((jutsu) =>
      jutsu.names.englishName.includes(name)
    );

    return {
      total: this.jutsus.length,
      page,
      pageSize: !!jutsusDocs ? jutsusDocs.length : 0,
      jutsus: !!jutsusDocs ? jutsusDocs : [],
    };
  }

  async findById(id: string): Promise<IJutsu | null> {
    const jutsu = this.jutsus.find((jutsu) => jutsu._id.toString() === id);
    return !!jutsu ? jutsu : null;
  }

  async findAll(limit: number, page: number): Promise<IResponseJutsu> {
    const totalPagesAvailable = Math.ceil(this.jutsus.length / limit);

    return {
      total: this.jutsus.length,
      page,
      pageSize: this.jutsus.length,
      jutsus: totalPagesAvailable < page ? [] : this.jutsus,
    };
  }

  async findByFilters(
    name: string,
    limit: number,
    page: number,
    kekkeiParams: IKekkeiParams[],
    classificationParams: IClassificationParams[],
    debutParams: Object[]
  ): Promise<IResponseJutsu> {
    let filteredJutsus = [] as IJutsu[];

    const responseObj = {
      total: 0,
      page,
      pageSize: 0,
      jutsus: [],
    };

    if (kekkeiParams.length > 0 && Object.keys(kekkeiParams[0]).length > 0) {
      const kekkeiJutsus = checkKekkei(kekkeiParams, this.jutsus);

      if (kekkeiJutsus.length > 0) {
        filteredJutsus.push(...kekkeiJutsus);
      } else {
        return responseObj;
      }
    }

    if (debutParams.length > 0 && Object.keys(debutParams[0]).length > 0) {
      const listJutsus =
        filteredJutsus.length > 0 ? filteredJutsus : this.jutsus;
      const debutJutsus = checkDebut(debutParams, listJutsus);

      if (debutJutsus.length > 0) {
        filteredJutsus = [];
        filteredJutsus.push(...debutJutsus);
      } else {
        return responseObj;
      }
    }
    if (
      classificationParams.length > 0 &&
      Object.keys(classificationParams[0]).length > 0
    ) {
      const listJutsus =
        filteredJutsus.length > 0 ? filteredJutsus : this.jutsus;
      const classificationJutsus = checkClassification(
        classificationParams,
        listJutsus
      );

      if (classificationJutsus.length > 0) {
        filteredJutsus = [];
        filteredJutsus.push(...classificationJutsus);
      } else {
        return responseObj;
      }
    }

    return {
      total: this.jutsus.length,
      page,
      pageSize: this.jutsus.length,
      jutsus: filteredJutsus,
    };
  }
}

export default JutsuRepositoryInMemory;
