import cors from "cors";

export default function corsHandler() {
  const whitelist = String(process.env.WHITELIST).split(",");

  const corsOptions = {
    origin: whitelist,
  };

  return cors(corsOptions);
}
