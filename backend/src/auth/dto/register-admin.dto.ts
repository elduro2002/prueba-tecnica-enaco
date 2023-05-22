import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterAdminDto {
    
    // Este decorador es utilizado para documentar la app, aparecera en la documentacion localhost:{puerto}/api
    @ApiProperty({
        title: 'nombre',
        nullable: false
    })

    @IsString()
    nombre: string


    @ApiProperty({
        title: 'usuario',
        nullable: false,
        uniqueItems: true
    })

    @IsString()
    usuario: string

    @ApiProperty({
        title: 'contra',
        nullable: false
    })

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener letras mayusculas, minusulas y numeros'
    })

    contrasena: string

}
