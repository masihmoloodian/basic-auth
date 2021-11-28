import { compare } from 'bcrypt'
import { Repository } from 'typeorm'


import { Injectable } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'


import { UserEntity } from '../users/entity/user.entity'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}

    async basicLogin(user: UserEntity): Promise<UserEntity> {
        let userFound: UserEntity

        if (user.user_name) {
            userFound = await this.usersRepository.findOne({
                user_name: user.user_name,
            })
        } else {
            throw new HttpException('Enter username field', 401)
        }

        /**
         * Check if user exists
         */
        if (userFound) {
            if (userFound.password && userFound.password !== '') {
                if (await compare(user.password, userFound.password)) {
                    return userFound
                } else {
                    throw new HttpException('Password is incorrect', 401)
                }
            }
        } else {
            throw new HttpException('User not found', 401)
        }
    }

    async basicRegister(user: UserEntity): Promise<UserEntity> {
        /**
         * Check if user exists
         */
        if (user.age <= 0) {
            console.log('>>', user.age)
            throw new HttpException('Enter valid age', 401)
        }
        let userFound: UserEntity
        if (user.user_name) {
            userFound = await this.usersRepository.findOne({
                user_name: user.user_name,
            })
        } else {
            throw new HttpException('Enter username field', 401)
        }
        if (userFound) throw new HttpException('Duplicate username', 401)
        return await this.usersRepository.save(user)
    }

    generateAccessToken(user: UserEntity): Object {
        const payload = { id: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
