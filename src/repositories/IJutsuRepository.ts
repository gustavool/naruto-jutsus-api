import IJutsu from "../models/IJutsu";
import { IResponseJutsu } from "../services/JutsuService";

interface IJutsuRepository {
  findById(id: string): Promise<IJutsu | null>;

  findByName(
    name: string,
    pageSize: number,
    page: number
  ): Promise<IResponseJutsu>;

  findAll(pageSize: number, page: number): Promise<IResponseJutsu>;

  findByFilters(
    kekkeiParams: Object[],
    classificationParams: Object[],
    debutParams: Object[]
  ): Promise<IJutsu[]>;
}

export default IJutsuRepository;
