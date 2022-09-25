import IJutsu from "../interfaces/IJutsu";
import Jutsu from "../models/Jutsu";

class JutsuService {
  async findById(id: string): Promise<IJutsu> {
    console.log("chamou service");

    const jutsu = await Jutsu.findById(id);
    // const jutsu = await Jutsu.find().exec();

    if (!jutsu) {
      throw new Error();
    }

    console.log("jutsu service", jutsu);

    return jutsu;
  }
}

export default JutsuService;
