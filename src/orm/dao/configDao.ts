import { Repository } from "typeorm";
import AppDataSource from "..";
import { Config } from "../entities/config";

export class ConfigDao {
  private configRepository: Repository<Config>;
  private static dao: ConfigDao;

  private constructor() {
    this.configRepository = AppDataSource.getRepository(Config);
  }

  public static getDao(): ConfigDao {
    if (!ConfigDao.dao) {
      ConfigDao.dao = new ConfigDao();
    }
    return ConfigDao.dao;
  }

  public async getConfigValue(name: string): Promise<string | null> {
    const configRecord = await this.configRepository.findOne({
      where: { name },
    });
    if (configRecord === null) {
      return null;
    }
    if (configRecord.value === null) {
      return null;
    }
    return configRecord.value;
  }
}
