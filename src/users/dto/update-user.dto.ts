import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Country } from 'src/auth/enum/countries.enum'


import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUser {
    @ApiPropertyOptional({ enum: Country })
    @IsString()
    @IsOptional()
    country: Country

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    age: number

    @ApiPropertyOptional()
    @IsOptional()
    password: string
}
