import IJutsu from "../interfaces/IJutsu";
import Jutsu from "../models/Jutsu";

class JutsuService {
  async findById(id: string): Promise<IJutsu | null> {
    return await Jutsu.findById(id);
  }
}

export default JutsuService;
