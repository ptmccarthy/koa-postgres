import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public brand: string;

  @Column()
  public model: string;

  @Column()
  public year: number;

  @Column()
  public odometer: number;
}
