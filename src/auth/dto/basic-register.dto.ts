import { IsNotEmpty } from 'class-validator'


import { ApiProperty } from '@nestjs/swagger'


import { Country } from '../enum/countries.enum'

export class BasicRegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    user_name: string

    @ApiProperty()
    @IsNotEmpty()
    password: string

    @ApiProperty({ enum: Country })
    @IsNotEmpty()
    country: Country

    @ApiProperty()
    @IsNotEmpty()
    age: number
}
