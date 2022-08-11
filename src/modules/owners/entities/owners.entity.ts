import { UsersEntity } from '../../../modules/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RelationalEntity } from '../../../common/entities/metadata/RelationalEntity';
import { PetsEntity } from '../../pets/entities/pets.entity';

@Entity('owners')
export class OwnersEntity extends RelationalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  pet_id: string;

  @Column()
  owner_name: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => PetsEntity)
  @JoinColumn({ name: 'pet_id' })
  pets: PetsEntity;
}
