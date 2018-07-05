import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column({ select: false })
  public password: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

}
