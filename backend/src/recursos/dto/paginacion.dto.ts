import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        default: 10, 
        description: 'El numero de datos que deseas'
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    limit?: number;

    
    @ApiProperty({
        default: 10, 
        description: 'El numro que desea saltar'
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    @Min(1)
    offset?: number
}