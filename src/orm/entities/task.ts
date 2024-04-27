import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { TaskGroup } from "./taskGroup";
import { UserTask } from "./userTask";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("text")
  description: string;

  @Column("varchar")
  type: string;

  @Column("int")
  reward: number;

  @Column("jsonb")
  data: unknown;

  @Column("varchar")
  url: string;

  @Column("boolean")
  active: boolean;

  @ManyToOne(() => TaskGroup, (taskGroup) => taskGroup.tasks)
  taskGroup: TaskGroup;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => UserTask, (userTask) => userTask.task)
  userTasks: UserTask[];
}
