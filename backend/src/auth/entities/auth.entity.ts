import { Recurso } from "src/recursos/entities/recurso.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Estos son los parametros de la base de datos, el decorador Entity hace referencia al nombre de la tabla en la DB
@Entity('administradores')
export class Administradores {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    nombre: string

    @Column('text', {
        unique: true
    })
    usuario: string

    @Column('text')
    contrasena: string

    @OneToMany(
        () => Usuario,
        ( usuario ) => usuario.administrador,
        {
            onDelete: 'CASCADE'
        }
    )
    
    usuarios: Usuario[]

    @OneToMany(
        () => Recurso,
        (recursos) => recursos.administrador,
        {
            onDelete: 'CASCADE'
        }
    )
    
    recursos: Recurso[]

}
