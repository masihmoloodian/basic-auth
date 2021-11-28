import { config } from 'dotenv'
import { Repository } from 'typeorm'


import { HttpStatus, Injectable } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { InjectRepository } from '@nestjs/typeorm'


import { AuthService } from '../auth/auth.service'
import { UpdateUser } from './dto/update-user.dto'
import { UserEntity } from './entity/user.entity'

config()
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly authService: AuthService
    ) {}

    async getUserById(id: string): Promise<any> {
        const userFound = await this.usersRepository.findOne({
            where: { id },
        })

        if (!userFound)
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
        return userFound
    }

    async updateUser(
        user: UserEntity,
        update: UpdateUser
    ): Promise<UserEntity> {
        if (update.age <= 0) {
            throw new HttpException('Enter valid age', 401)
        }
        const userUpdated = Object.assign(user, update)
        return await this.usersRepository.save(userUpdated)
    }
}
