import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserEntity } from '../../users/entity/user.entity'
import { UserService } from '../../users/user.service'


import { HttpException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(
        payload: any,
        done: (error: any, result: any) => any
    ): Promise<UserEntity> {
        const user = await this.userService.getUserById(payload.id)
        // TODO: If user is block?
        // TODO: If user is deleted?
        if (user) return done(null, user)
        throw new HttpException('User not found!', 401)
    }
}
