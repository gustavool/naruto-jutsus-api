import { container } from "tsyringe";
import JutsuRepository from "./repositories/JutsuRepository";
import JutsuService from "./services/JutsuService";

container.registerSingleton<JutsuRepository>(
  "JutsuRepository",
  JutsuRepository
);

container.registerSingleton<JutsuService>("JutsuService", JutsuService);
