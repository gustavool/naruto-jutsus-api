import IJutsu from "../models/IJutsu";

interface IJutsuRepository {
  findById(id: string): Promise<IJutsu | null>;

  findAll(pageSize: number, page: number): Promise<IJutsu[]>;

  findByFilters(
    kekkeiParams: Object[],
    classificationParams: Object[],
    debutParams: Object[]
  ): Promise<IJutsu[]>;
}

export default IJutsuRepository;
