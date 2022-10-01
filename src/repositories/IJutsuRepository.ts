import IJutsu from "../models/IJutsu";

interface IJutsuRepository {
  findById(id: string): Promise<IJutsu | null>;

  findByName(name: string, pageSize: number, page: number): Promise<IJutsu[]>;

  findAll(pageSize: number, page: number): Promise<IJutsu[]>;

  findByFilters(
    kekkeiParams: Object[],
    classificationParams: Object[],
    debutParams: Object[]
  ): Promise<IJutsu[]>;
}

export default IJutsuRepository;
