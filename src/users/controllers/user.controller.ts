


import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'


import { JwtGuard } from '../../auth/guard/jwt.guard'
import { User } from '../../shared/decorators/user.decorator'
import { ResponseDTO } from '../../shared/dto/response.dto'
import { UpdateUser } from '../dto/update-user.dto'
import { UserEntity } from '../entity/user.entity'
import { UserService } from '../user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user information with user token' })
    @UseGuards(JwtGuard)
    @Get()
    async getUserById(@User() UserEntity: UserEntity): Promise<ResponseDTO> {
        const user = await this.userService.getUserById(UserEntity.id)
        return new ResponseDTO(user.clean())
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Update user information with user token',
    })
    @UseGuards(JwtGuard)
    @Patch()
    async updateUser(
        @Body() update: UpdateUser,
        @User() user: UserEntity
    ): Promise<ResponseDTO> {
        const userUpdated = await this.userService.updateUser(
            new UserEntity(user),
            update
        )
        return new ResponseDTO(userUpdated.clean())
    }
}
