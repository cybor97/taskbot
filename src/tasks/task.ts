import { User } from "../orm/entities/user";

export abstract class TaskVerifier {
  abstract verify(user: User, ...args: unknown[]): Promise<boolean>;
}
