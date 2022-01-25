import { Exclude } from "class-transformer";
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("users")
class User {

  @PrimaryColumn()
  readonly id: String;

  @Column({ type: "varchar", length: 250 })
  name: String;

  @Column({ type: "varchar", length: 250, unique: true })
  email: String;

  @Column({ type: "varchar", length: 250, default: 'comum' })
  role: String;

  @Column({ type: "varchar", length: 250 })
  photo: String;

  @Exclude()
  @Column({ type: "varchar", length: 250 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }

}

export { User };