import IJutsu from "../models/IJutsu";
import IJutsuRepository from "./IJutsuRepository";
import { JutsusMock } from "./JutsusMock";

interface IKekkeiParams {
  "data.kekkeiGenkai": string;
}

interface IClassificationParams {
  "data.classification": string;
}

class JutsuRepositoryInMemory implements IJutsuRepository {
  jutsus: IJutsu[] = JutsusMock;

  async findById(id: string): Promise<IJutsu | null> {
    const jutsu = this.jutsus.find((jutsu) => jutsu._id.toString() === id);
    return !!jutsu ? jutsu : null;
  }

  async findAll(pageSize: number, page: number): Promise<IJutsu[]> {
    const totalPagesAvailable = Math.ceil(this.jutsus.length / pageSize);

    if (totalPagesAvailable < page) {
      return [];
    }
    return this.jutsus;
  }

  checkKekkei(kekkeiParams: IKekkeiParams[], jutsuList: IJutsu[]) {
    let kekkeiJutsus = [] as IJutsu[];
    const kekkeiGenkaiListParams = kekkeiParams.map(
      (kekkei) => kekkei["data.kekkeiGenkai"]
    );

    jutsuList.forEach((jutsu) => {
      if (
        kekkeiGenkaiListParams.every((i) => {
          return jutsu.data?.kekkeiGenkai?.includes(i);
        })
      ) {
        kekkeiJutsus.push(jutsu);
      }
    });

    return kekkeiJutsus;
  }

  checkDebut(debutParams: Object[], jutsuList: IJutsu[]) {
    let debutJutsus = [] as IJutsu[];
    const debutListParams = debutParams.map((debut) =>
      Object.keys(debut)[0].replace("debut.", "")
    );

    jutsuList.forEach((jutsu) => {
      if (
        debutListParams.every((i) => {
          return Object.keys(Object(jutsu.debut)).includes(i);
        })
      ) {
        debutJutsus.push(jutsu);
      }
    });

    return debutJutsus;
  }

  checkClassification(
    classificationParams: IClassificationParams[],
    jutsuList: IJutsu[]
  ) {
    let classificationJutsus = [] as IJutsu[];
    const classificationListParams = classificationParams.map(
      (classification) => classification["data.classification"]
    );

    jutsuList.forEach((jutsu) => {
      if (
        classificationListParams.every((i) => {
          return jutsu.data?.classification?.includes(i);
        })
      ) {
        classificationJutsus.push(jutsu);
      }
    });

    return classificationJutsus;
  }

  async findByFilters(
    kekkeiParams: IKekkeiParams[],
    classificationParams: IClassificationParams[],
    debutParams: Object[]
  ): Promise<IJutsu[]> {
    let filteredJutsus = [] as IJutsu[];

    if (kekkeiParams.length > 0 && Object.keys(kekkeiParams[0]).length > 0) {
      const kekkeiJutsus = this.checkKekkei(kekkeiParams, this.jutsus);

      if (kekkeiJutsus.length > 0) {
        filteredJutsus.push(...kekkeiJutsus);
      } else {
        return [];
      }
    }

    if (debutParams.length > 0 && Object.keys(debutParams[0]).length > 0) {
      const listJutsus =
        filteredJutsus.length > 0 ? filteredJutsus : this.jutsus;
      const debutJutsus = this.checkDebut(debutParams, listJutsus);

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
      const classificationJutsus = this.checkClassification(
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
