import "express-async-errors";

import { inspect } from "util";
import express from "express";
import { AuthDataValidator } from "@telegram-auth/server";
import { UserDao } from "../orm/dao/userDao";
import logger from "../utils/logger";
import miniapp from "../routers/miniapp";

export function initAPI(): void {
  const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });

  const app = express();

  app.use(async (req, res, next) => {
    try {
      const queryMap = new Map(Object.entries(req.query));
      // @ts-expect-error undefined is not a problem here
      const tgUser = await validator.validate(queryMap);

      const referralCode = req.query.referral_code?.toString() ?? null;
      const walletId = req.query.wallet_id?.toString() ?? null;

      const user = await UserDao.getDao().initUser(tgUser, referralCode);
      if (walletId !== null) {
        await UserDao.getDao().setWalletId(user, walletId);
      }

      req.app.locals.user = user;
      next();
    } catch (error) {
      logger.error(`Error: ${inspect(error)}`);
      res.status(401).send({ error: inspect(error) });
    }
  });

  app.use("/api", miniapp);

  app.use((_req, res, _next) => {
    res.status(404).send({ error: "Not found" });
  });
  app.use(function (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: () => void,
  ) {
    logger.error(`Error: ${inspect(err)}`);
    res.status(500).send({ error: inspect(err) });
  });

  const port = process.env.PORT ?? null;
  app.listen(port === null ? 5175 : parseInt(port), "localhost", () => {
    console.log(`Listening on port ${port}`);
  });
}
