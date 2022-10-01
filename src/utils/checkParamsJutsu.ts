import IJutsu from "../models/IJutsu";
import {
  IClassificationParams,
  IKekkeiParams,
} from "../repositories/JutsuRepositoryInMemory";

export function checkKekkei(
  kekkeiParams: IKekkeiParams[],
  jutsuList: IJutsu[]
) {
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

export function checkDebut(debutParams: Object[], jutsuList: IJutsu[]) {
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

export function checkClassification(
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
