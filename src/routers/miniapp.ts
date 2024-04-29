import express from "express";
import { TaskDao } from "../orm/dao/taskDao";
import { UserDao } from "../orm/dao/userDao";
import { TaskVerifier } from "../tasks/task";
import { ConfigDao } from "../orm/dao/configDao";
import taskVerifierMap from "../tasks";

const router = express.Router();

router.get("/me", (req, res) => {
  res.status(200).send(req.app.locals.user);
});
router.get("/tasks", async (req, res) => {
  const tasksGroupsData = await TaskDao.getDao().getTasksGroupped(
    req.app.locals.user,
  );
  res.status(200).send(tasksGroupsData);
});

router.post("/tasks/:taskId/verify", async (req, res) => {
  const taskId = parseInt(req.params.taskId);

  const taskDao = TaskDao.getDao();
  const userTask = await taskDao.getTaskById(taskId);
  if (userTask === null) {
    res.status(404).send({ error: "Task not found" });
    return;
  }

  const verifier: TaskVerifier =
    //@ts-expect-error undefined is not a problem here
    taskVerifierMap[userTask.task.type] ?? taskVerifierMap.default;
  const verified = await verifier.verify(userTask.user, userTask.task.data);

  if (verified) {
    await taskDao.complete(userTask);
    res.status(200).send({ verified });
  } else {
    res.status(400).send({ error: "Verification failed" });
  }
});
router.get("/xp", async (req, res) => {
  const totalXp = await TaskDao.getDao().getTotalXP(req.app.locals.user.id);
  res.status(200).send({ totalXp });
});
router.get("/referrals/count", async (req, res) => {
  const referralsCount = await UserDao.getDao().getReferralsCount(
    req.app.locals.user.id,
  );
  res.status(200).send({ referralsCount });
});
router.get("/dropat", async (req, res) => {
  const dropAt = await ConfigDao.getDao().getConfigValue("drop_at");
  res.status(200).send({ dropAt });
});
router.get("/referrals_limit", async (req, res) => {
  const referralsLimit = await ConfigDao.getDao().getConfigValue(
    "referrals_limit",
  );
  res.status(200).send({ referralsLimit });
});

export default router;
