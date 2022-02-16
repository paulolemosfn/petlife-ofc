import { OwnersEntity } from './../../owners/entities/owners.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RelationalEntity } from '../../../common/entities/metadata/RelationalEntity';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity()
export class PetsEntity extends RelationalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pet_name: string;

  @Column({ type: 'uuid', nullable: true })
  owner_id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column()
  pet_code: string;

  @Column()
  breed: string;

  @Column()
  pet_type: string;

  @Column()
  activity: string;

  @Column()
  activity_date: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => OwnersEntity)
  @JoinColumn({ name: 'owner_id' })
  owner: OwnersEntity;
}
