import IJutsu from "../models/IJutsu";
import { IResponseJutsu } from "../services/JutsuService";

interface IJutsuRepository {
  findById(id: string): Promise<IJutsu | null>;

  findByName(
    name: string,
    limit: number,
    page: number
  ): Promise<IResponseJutsu>;

  findAll(limit: number, page: number): Promise<IResponseJutsu>;

  findByFilters(
    name: string,
    limit: number,
    page: number,
    kekkeiParams: Object[],
    classificationParams: Object[],
    debutParams: Object[],
    typeParams: Object[]
  ): Promise<IResponseJutsu>;
}

export default IJutsuRepository;
