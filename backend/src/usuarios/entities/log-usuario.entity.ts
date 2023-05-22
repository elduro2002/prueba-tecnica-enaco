import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity('log-usuario')
export class LogUsuario {

    @PrimaryColumn()
    id: string

    @Column('text', {
        nullable: false
    })
    motivo: string

}