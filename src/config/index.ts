import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT === undefined ? 3000 : parseInt(process.env.PORT, 10),
  db: {
    name: process.env.DB_NAME ?? "ducktaskbot",
    host: process.env.DB_HOST ?? "localhost",
    port:
      process.env.DB_PORT === undefined
        ? 5432
        : parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME ?? "postgres",
    password: process.env.DB_PASSWORD ?? "",
  },
  loki: {
    host: process.env.LOKI_HOST,
    token: process.env.LOKI_TOKEN,
    label: process.env.LOKI_LABEL,
  },
};
