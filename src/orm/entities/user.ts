import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { UserTask } from "./userTask";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  @Index("user_tgid_idx")
  tgId: string | null;

  @Column("varchar")
  @Index("username_idx", { unique: true })
  username: string;

  @Column("boolean")
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.referrals, { eager: true })
  referredBy: User;

  @OneToMany(() => User, (user) => user.referredBy, { eager: false })
  referrals: User[];

  @OneToMany(() => UserTask, (userTask) => userTask.user)
  userTasks: UserTask[];
}
