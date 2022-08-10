import { OwnersEntity } from '../../owners/entities/owners.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RelationalEntity } from '../../../common/entities/metadata/RelationalEntity';
import { PetsEntity } from '../../pets/entities/pets.entity';

@Entity()
export class ActivityEntity extends RelationalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  pet_id: string;

  @Column({ type: 'uuid', nullable: true })
  owner_id: string;

  @Column()
  created_by: string;

  @Column()
  activity: string;

  @Column()
  activity_date: string;

  @Column()
  activity_hour: string;

  @ManyToOne(() => PetsEntity)
  @JoinColumn({ name: 'pet_id' })
  pets: PetsEntity;

  @ManyToOne(() => OwnersEntity)
  @JoinColumn({ name: 'owner_id' })
  owner: OwnersEntity;
}
