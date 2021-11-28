import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'


import { AuthModule } from '../auth/auth.module'
import { UserController } from './controllers/user.controller'
import { UserEntity } from './entity/user.entity'
import { UserService } from './user.service'

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule {}
