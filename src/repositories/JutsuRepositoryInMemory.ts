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
  findByName(
    name: string,
    pageSize: number,
    page: number
  ): Promise<IResponseJutsu> {
    throw new Error("Method not implemented.");
  }
  jutsus: IJutsu[] = JutsusMock;

  async findById(id: string): Promise<IJutsu | null> {
    const jutsu = this.jutsus.find((jutsu) => jutsu._id.toString() === id);
    return !!jutsu ? jutsu : null;
  }

  async findAll(pageSize: number, page: number): Promise<IResponseJutsu> {
    const totalPagesAvailable = Math.ceil(this.jutsus.length / pageSize);

    return {
      total: this.jutsus.length,
      page,
      pageSize: this.jutsus.length,
      jutsus: totalPagesAvailable < page ? [] : this.jutsus,
    };
  }

  async findByFilters(
    kekkeiParams: IKekkeiParams[],
    classificationParams: IClassificationParams[],
    debutParams: Object[]
  ): Promise<IJutsu[]> {
    let filteredJutsus = [] as IJutsu[];

    if (kekkeiParams.length > 0 && Object.keys(kekkeiParams[0]).length > 0) {
      const kekkeiJutsus = checkKekkei(kekkeiParams, this.jutsus);

      if (kekkeiJutsus.length > 0) {
        filteredJutsus.push(...kekkeiJutsus);
      } else {
        return [];
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
        return [];
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
        return [];
      }
    }
    return filteredJutsus;
  }
}

export default JutsuRepositoryInMemory;
