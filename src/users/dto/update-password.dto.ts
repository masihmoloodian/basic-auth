import { IsString } from 'class-validator'


import { ApiProperty } from '@nestjs/swagger'

export class UpdatePassword {
    // @ApiProperty()
    // @IsString()
    // old_password: string

    @ApiProperty()
    @IsString()
    new_password: string
}
