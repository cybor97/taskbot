import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { Task } from "./task";
import { User } from "./user";

@Entity()
export class UserTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.userTasks)
  task: Task;

  @ManyToOne(() => User, (user) => user.userTasks)
  user: User;

  @Column("int")
  reward: number;

  @Column("boolean")
  completed: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
