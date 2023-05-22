import { Administradores } from "src/auth/entities/auth.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TIPO } from "../types/tipoEnum";

@Entity('recursos')
export class Recurso {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {
        nullable: false
    })
    nombre: string

    @Column('text', {
        nullable: false
    })
    descripcion: string

    @Column({
        type: 'enum',
        enum: TIPO,
        // default: 'video'
    })
    tipo: TIPO

    
    @Column('text', {
        nullable: false
    })
    url: string

    @ManyToOne(
        () => Usuario,
        (usuario) => usuario.id,
        {
            onDelete: 'CASCADE'
        }
    )

    usuario: Usuario

    @ManyToOne(
        () => Administradores,
        (admin) => admin.id,
        {
            onDelete: 'CASCADE'
        }
    )
    administrador: Administradores

}
