import { Administradores } from "src/auth/entities/auth.entity";
import { Recurso } from "src/recursos/entities/recurso.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LogUsuario } from "./log-usuario.entity";

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {
        unique: true,
        nullable: false
    })
    usuario: string

    @Column('bool', {
        default: true
    })
    activo: boolean

    @ManyToOne(
        () => Administradores,
        ( administradores ) => administradores.usuarios
    )

    administrador: Administradores

    @OneToMany(
        () => Recurso,
        (recurso) => recurso.usuario
    )
    recursos: Recurso[]

    // @OneToMany(
    //     () => LogUsuario,
    //     (logUsuario) => logUsuario.usuario
    // )

    // logUsuario: LogUsuario[]

}
