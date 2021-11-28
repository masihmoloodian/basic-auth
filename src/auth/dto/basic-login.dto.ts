import { ApiProperty } from '@nestjs/swagger'

export class basicLoginDto {
    @ApiProperty()
    user_name: string

    @ApiProperty()
    password: string
}
