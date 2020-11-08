import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  UF: string;

  @Column()
  city: string;

  @Column()
  cpf: string;

  @Column()
  isInfluencer: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
