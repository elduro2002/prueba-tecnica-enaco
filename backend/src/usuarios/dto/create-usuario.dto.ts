import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUsuarioDto {
 
    @ApiProperty({
        title: 'usuario',
        nullable: false
    })
    @IsString()
    usuario: string
}
