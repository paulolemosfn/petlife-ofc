import { RelationalEntity } from '../../../common/entities/metadata/RelationalEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OwnersEntity } from '../../owners/entities/owners.entity';
import { hashPasswordTransform } from '../../../system/interceptors/crypto';
import { Exclude } from 'class-transformer';

@Entity()
export class UsersEntity extends RelationalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ transformer: hashPasswordTransform, select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => OwnersEntity, (owner) => owner.user, { eager: true })
  owners: OwnersEntity[];
}
