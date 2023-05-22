import { IsString } from "class-validator";

export class EliminarUsuarioDto {
    @IsString()
    motivo: string
}