import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty({
        title: 'usuario'
    })

    @IsString()
    usuario: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Contraseña invalida'
    }) 
    contrasena: string
    
}
