import { UserEntity } from 'src/users/entity/user.entity'


import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'


import { ResponseDTO } from '../../shared/dto/response.dto'
import { AuthService } from '../auth.service'
import { basicLoginDto } from '../dto/basic-login.dto'
import { BasicRegisterDto } from '../dto/basic-register.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Login with username' })
    @Post('login')
    async basicLogin(@Body() login: basicLoginDto): Promise<ResponseDTO> {
        const user = await this.authService.basicLogin(new UserEntity(login))
        const token = this.authService.generateAccessToken(user)
        return new ResponseDTO(token)
    }

    @ApiOperation({ summary: 'Basic register with username and password' })
    @Post('register')
    async basicRegister(
        @Body() register: BasicRegisterDto
    ): Promise<ResponseDTO> {
        const user = await this.authService.basicRegister(
            new UserEntity(register)
        )
        return new ResponseDTO(user.clean())
    }
}
