import JutsuRepositoryInMemory from "../repositories/JutsuRepositoryInMemory";
import { AppError } from "../utils/AppError";
import JutsuService from "./JutsuService";

describe("Find a jutsu by Id", () => {
  let jutsuRepository: JutsuRepositoryInMemory;
  let jutsuService: JutsuService;

  beforeAll(() => {
    jutsuRepository = new JutsuRepositoryInMemory();
    jutsuService = new JutsuService(jutsuRepository);
  });

  it("should return a jutsu searching by Id", async () => {
    const jutsu = await jutsuService.findById("1234893fb1004c98474d0fac");
    expect(jutsu?._id.toString()).toBe("1234893fb1004c98474d0fac");
  });

  it("should return error 404 if not found a jutsu", async () => {
    await expect(
      jutsuService.findById("43218989b1004c98474d16d2")
    ).rejects.toEqual(new AppError("Jutsu not found", 404));
  });

  it("should return error 400 if id is invalid", async () => {
    await expect(jutsuService.findById("12345abc")).rejects.toEqual(
      new AppError("Id is invalid", 400)
    );
  });
});
