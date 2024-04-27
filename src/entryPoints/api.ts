import { inspect } from "util";
import express from "express";
import { AuthDataValidator } from "@telegram-auth/server";
import { UserDao } from "../orm/dao/userDao";
import logger from "../utils/logger";
import { TaskDao } from "../orm/dao/taskDao";
import taskVerifierMap from "../tasks";
import { TaskVerifier } from "../tasks/task";

export function initAPI(): void {
  const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });

  const app = express();

  app.use(async (req, res, next) => {
    try {
      const queryMap = new Map(Object.entries(req.query));
      // @ts-expect-error undefined is not a problem here
      const tgUser = await validator.validate(queryMap);

      const referralCode = req.query.referral_code?.toString() ?? null;

      const user = await UserDao.getDao().initUser(tgUser, referralCode);

      req.app.locals.user = user;
      res.status(200).send({ user });
      next();
    } catch (error) {
      logger.error(`Error: ${inspect(error)}`);
      res.status(401).send({ error: inspect(error) });
    }
  });

  app.get("/me", (req, res) => {
    res.status(200).send(req.app.locals.user);
  });
  app.get("/tasks", async (req, res) => {
    const tasksGroupsData = await TaskDao.getDao().getTasksGroupped(
      req.app.locals.user,
    );
    res.status(200).send(tasksGroupsData);
  });

  app.post("/tasks/:taskId/verify", async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const userTask = await TaskDao.getDao().getTaskById(taskId);
    if (userTask === null) {
      res.status(404).send({ error: "Task not found" });
      return;
    }

    const verifier: TaskVerifier =
      //@ts-expect-error undefined is not a problem here
      taskVerifierMap[userTask.task.type] ?? taskVerifierMap.default;
    const verified = await verifier.verify(userTask.user, userTask.task.data);
    if (verified) {
      res.status(200).send({ verified });
    } else {
      res.status(400).send({ error: "Verification failed" });
    }
  });
  app.get("/xp", async (req, res) => {
    const totalXp = await TaskDao.getDao().getTotalXP(req.app.locals.user.id);
    res.status(200).send({ totalXp });
  });
  app.get("/referrals/count", async (req, res) => {
    const referralsCount = await UserDao.getDao().getReferralsCount(
      req.app.locals.user.id,
    );
    res.status(200).send({ referralsCount });
  });

  const port = process.env.PORT ?? null;
  app.listen(port === null ? 5175 : parseInt(port), "localhost", () => {
    console.log(`Listening on port ${port}`);
  });
}
