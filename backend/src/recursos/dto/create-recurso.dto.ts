import { IsEnum, IsOptional, IsString, IsUUID, IsUrl } from "class-validator";
import { TIPO } from "../types/tipoEnum";

export class CreateRecursoDto {

    @IsString()
    nombre: string

    @IsString()
    descripcion: string

    @IsUrl()
    url: string

    @IsString()
    @IsUUID()
    usuarioId: string

    @IsEnum(TIPO)
    tipo: TIPO

}
