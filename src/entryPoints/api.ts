import { inspect } from "util";
import express from "express";
import { AuthDataValidator } from "@telegram-auth/server";

export function initAPI(): void {
  const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });

  const app = express();

  app.use(async (req, res) => {
    try {
      // @ts-expect-error undefined is not a problem here
      const user = await validator.validate(new Map(Object.entries(req.query)));

      res.status(200).send({ user });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: inspect(error) });
    }
  });

  const port = process.env.PORT ?? null;
  app.listen(port === null ? 5175 : parseInt(port), "localhost", () => {
    console.log(`Listening on port ${port}`);
  });
}
