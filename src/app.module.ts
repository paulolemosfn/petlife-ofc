import { OwnersModule } from './modules/owners/owners.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './system/database/connection';
import { UsersModule } from './modules/users/users.module';
import { UseremailRequestMiddleware } from './system/headers/middlewares/useremail.middleware';
import { UsernameRequestMiddleware } from './system/headers/middlewares/username.middleware';
import { UserIdRequestMiddleware } from './system/headers/middlewares/userId.middleware';
import { UsersRepository } from './modules/users/repositories/users.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    OwnersModule,
    UsersRepository,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        UsernameRequestMiddleware,
        UseremailRequestMiddleware,
        UserIdRequestMiddleware,
      )
      .forRoutes('owners', 'users/**');
  }
}
