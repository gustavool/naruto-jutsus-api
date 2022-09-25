import mongoose from "mongoose";
import IJutsu from "../interfaces/IJutsu";

const JutsuSchema = new mongoose.Schema<IJutsu>({
  names: {
    englishName: {
      type: String,
      required: true,
    },
    kanjiName: {
      type: String,
    },
    romajiName: {
      type: String,
    },
    literalEnglish: {
      type: String,
    },
    englishGames: {
      type: String,
    },
    vizPrintMedia: {
      type: String,
    },
    alternativeNames: {
      type: String,
    },
  },

  debut: {
    manga: {
      type: String,
    },
    anime: {
      type: String,
    },
    novel: {
      type: String,
    },
    movie: {
      type: String,
    },
    game: {
      type: String,
    },
    ova: {
      type: String,
    },
  },

  data: {
    classification: {
      type: [String],
    },
    kekkeiGenkai: {
      type: [String],
    },
    type: {
      type: [String],
    },
    class: {
      type: [String],
    },
    range: {
      type: [String],
    },
    rank: {
      type: String,
    },
    handSeals: {
      type: String,
    },
  },

  images: [
    {
      src: {
        type: String,
      },
      alt: {
        type: String,
      },
    },
  ],

  description: {
    type: String,
    required: true,
  },

  relatedJutsu: {
    type: [String],
  },

  parentJutsu: {
    type: [String],
  },

  derivedJutsu: {
    type: [String],
  },

  users: {
    type: [String],
  },

  createdAt: {
    type: Date,
  },
});

export default mongoose.model("jutsu", JutsuSchema);
