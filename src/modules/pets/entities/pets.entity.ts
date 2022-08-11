import { OwnersEntity } from './../../owners/entities/owners.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  user_id: string;

  @Column()
  breed: string;

  @Column()
  pet_type: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  // eslint-disable-next-line prettier/prettier
  @OneToMany(() => OwnersEntity, owner => owner.pets)
  owner?: OwnersEntity[];
}
