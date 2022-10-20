import JutsuRepositoryInMemory from "../repositories/JutsuRepositoryInMemory";
import { AppError } from "../utils/AppError";
import JutsuService from "./JutsuService";

describe("Find jutsus", () => {
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

  it("should return a jutsu searching by name", async () => {
    const jutsu = await jutsuService.findByName("Chid", 20, 0);
    expect(jutsu.jutsus[0]._id.toString()).toBe("4321893fb1004c98474d0fac");
    expect(jutsu.pageSize).toBe(1);
  });

  it("should return error 404 if not found a list of jutsus by name", async () => {
    await expect(jutsuService.findByName("Susanoo", 20, 0)).rejects.toEqual(
      new AppError("Jutsu not found", 404)
    );
  });

  it("should return a list of jutsus searching by all with limit and page number params", async () => {
    const jutsus = await jutsuService.findAll(20, 1);
    expect(jutsus.pageSize).toBeLessThanOrEqual(20);
  });

  it("should return error 404 if not found a list of jutsus", async () => {
    await expect(jutsuService.findAll(20, 2)).rejects.toEqual(
      new AppError("Jutsus not found", 404)
    );
  });

  it("should return a list of jutsus searching by Classification", async () => {
    const jutsusWithClassification = await jutsuService.findByFilters(
      20,
      0,
      "",
      "Ninjutsu",
      "",
      ""
    );

    expect(jutsusWithClassification.jutsus[0].data?.classification).toContain(
      "Ninjutsu"
    );
    expect(jutsusWithClassification.jutsus.length).toBe(2);
  });

  it("should return a list of jutsus searching by Classification and Debut", async () => {
    const jutsusWithClassificationAndDebut = await jutsuService.findByFilters(
      20,
      0,
      "",
      "Ninjutsu",
      "Anime",
      ""
    );

    expect(
      jutsusWithClassificationAndDebut.jutsus[0].data?.classification
    ).toContain("Ninjutsu");
    expect(jutsusWithClassificationAndDebut.jutsus[0].debut?.anime).not.toBe(
      ""
    );
    expect(jutsusWithClassificationAndDebut.jutsus.length).toBe(2);
  });

  it("should return a list of jutsus searching by Classification, KekkeiGenkai and Debut", async () => {
    const jutsuWithKekkeiAndClassAndDebut = await jutsuService.findByFilters(
      20,
      0,
      "Sharingan",
      "Ninjutsu",
      "Anime,Manga",
      ""
    );

    expect(
      jutsuWithKekkeiAndClassAndDebut.jutsus[0].data?.kekkeiGenkai
    ).toContain("Sharingan");
    expect(
      jutsuWithKekkeiAndClassAndDebut.jutsus[0].data?.classification
    ).toContain("Ninjutsu");
    expect(jutsuWithKekkeiAndClassAndDebut.jutsus[0].debut?.anime).not.toBe("");
    expect(jutsuWithKekkeiAndClassAndDebut.jutsus.length).toBe(1);
  });

  it("should return error 404 if not found a list of jutsus by filter", async () => {
    await expect(
      jutsuService.findByFilters(
        20,
        0,
        "Sharingan,Rinnegan",
        "Ninjutsu",
        "Anime,Manga",
        ""
      )
    ).rejects.toEqual(new AppError("Jutsus with filters not found", 404));
  });
});
