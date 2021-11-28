


import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'


import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/user.module'

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
