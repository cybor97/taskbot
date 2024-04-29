import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Config } from "./entities/config";
import { Task } from "./entities/task";
import { TaskGroup } from "./entities/taskGroup";
import { config } from "../config";
import { UserTask } from "./entities/userTask";
import logger from "../utils/logger";
import { Init1714240541421 } from "./migrations/1714240541421-init";
import { AddTonWalletAndReferralCode1714254417296 } from "./migrations/1714254417296-migration";
import { UsernameNullable1714255919453 } from "./migrations/1714255919453-UsernameNullable";
import { NullableURL1714360899578 } from "./migrations/1714360899578-NullableURL";

const AppDataSource = new DataSource({
  type: "postgres",
  database: config.db.name,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  entities: [User, Config, Task, TaskGroup, UserTask],
  migrations: [
    Init1714240541421,
    AddTonWalletAndReferralCode1714254417296,
    UsernameNullable1714255919453,
    NullableURL1714360899578,
  ],
});

if (process.env.WITH_MIGRATION_DATASOURCE === "true") {
  AppDataSource.initialize()
    .then(() => {
      logger.info("[DataSource][init] Data Source has been initialized!");
    })
    .catch((err) => {
      logger.error(
        "[DataSource][init] Error during Data Source initialization",
        err,
      );
    });
}

export default AppDataSource;
