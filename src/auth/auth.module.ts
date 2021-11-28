import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt/dist/jwt.module'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'


import { UserEntity } from '../users/entity/user.entity'
import { UsersModule } from '../users/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './controllers/auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
    imports: [
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
