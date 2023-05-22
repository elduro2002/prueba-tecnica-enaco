import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { TIPO } from "../types/tipoEnum";
import { ApiProperty } from "@nestjs/swagger";

export class BusquedaDto {
    @ApiProperty({
        title: 'nombre',
        nullable: true,
        example: 'recurso1'
    })
    @IsString()
    @IsOptional()
    nombre?: string

    @ApiProperty({
        title: 'tipo',
        nullable: true,
        enum: TIPO,
        example: 'video'
    })
    @IsEnum(TIPO)
    @IsOptional()
    tipo?: TIPO

    @ApiProperty({
        title: 'usuarioId',
        nullable: true,
        example: '18269b65-1329-4376-869f-5d65317128f3'
    })
    @IsUUID()
    @IsOptional()
    usuarioId?: string

}