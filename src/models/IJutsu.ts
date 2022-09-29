import mongoose from "mongoose";

interface Names {
  englishName: string;
  kanjiName?: string;
  romajiName?: string;
  literalEnglish?: string;
  englishGames?: string;
  englishAnime?: string;
  vizPrintMedia?: string;
  alternativeNames?: string;
}

interface Debut {
  manga?: string;
  anime?: string;
  novel?: string;
  movie?: string;
  game?: string;
  ova?: string;
}

interface Data {
  classification?: string[];
  kekkeiGenkai?: string[];
  type?: string[];
  class?: string[];
  range?: string[];
  rank?: string;
  handSeals?: string;
}

interface Image {
  src: string;
  alt?: string;
}

interface IJutsu {
  _id: mongoose.Types.ObjectId;
  names: Names;
  debut?: Debut;
  data?: Data;
  images?: Image[];
  description: string;
  relatedJutsu?: string[];
  parentJutsu?: string[];
  derivedJutsu?: string[];
  users?: string[];
  createdAt: Date;
}

export default IJutsu;
