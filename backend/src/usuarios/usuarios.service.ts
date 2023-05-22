import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Administradores } from 'src/auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { LogUsuario } from './entities/log-usuario.entity';
import { EliminarUsuarioDto } from './dto/elimininar-usuaro.dto';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(LogUsuario)
    private readonly logUsuarioRepository: Repository<LogUsuario>
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto, administrador: Administradores) {

    // Comprobando si el usuario existe, en caso de existir enviara un mensaje de error al admin, ya que este usuario debe ser unico
    const user = await this.usuarioRepository.findOneBy({ usuario: createUsuarioDto.usuario })


    if (user) {
      throw new BadRequestException('El nombre de usuario ya existe, porfavor elija otro usuario')
    }

    try {

      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        administrador
      })

      await this.usuarioRepository.save(usuario)

      delete usuario.administrador.contrasena
      return {
        msg: 'Usuario creado satisfactoriamente',
        usuario
      }

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ha ocurrido un error al crear el usuario, intente de nuevo')
    }

  }

  async findAll(administrador: Administradores) {
    const usuarios = await this.usuarioRepository.find({
      where: {
        administrador
      }
    })

    return {
      usuarios
    }

  }

  async findOne(id: string) {

    const usuario = await this.usuarioRepository.findOne({
      where: {
        id
      },
      relations: {
        administrador: true
      }
    })

    if (!usuario) {
      const logUsuario = await this.logUsuarioRepository.findOneBy({ id })

      if (!logUsuario) {
        throw new NotFoundException(`Usuario con el id: ${id} no existe`)
      }

      throw new NotFoundException(`El usuario con el ID: ${ id } se ha eliminado por la siguiente razon: ${ logUsuario.motivo }`)

    }

    return usuario
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto, administrador: Administradores) {

    const userNew = await this.usuarioRepository.findOneBy({ usuario: updateUsuarioDto.usuario })

    if (userNew) {
      throw new BadRequestException(`El usuario ${updateUsuarioDto.usuario} ya esta en uso`)
    }

    const user = await this.findOne(id)

    const query = this.usuarioRepository.createQueryBuilder()

    if (user.administrador.id !== administrador.id) {
      throw new UnauthorizedException('Este administrador no tiene permisos para actualizar este usuario')
    }

    try {

      await query
        .update(Usuario)
        .set({
          usuario: updateUsuarioDto.usuario
        })
        .where("id = :id", { id })
        .execute()

      return {
        msg: 'Nombre de usuario actualizado correctamente',
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ha ocurrido un error al actualizar el usuario')
    }


  }

  async remove(id: string, administrador: Administradores, eliminarUsuarioDto: EliminarUsuarioDto) {

    const user = await this.findOne(id)

    const logUsuario = this.logUsuarioRepository.create({
      id: user.id,
      ...eliminarUsuarioDto
    })

    if (user.administrador.id !== administrador.id) {
      throw new UnauthorizedException('Este administrador no tiene permisos para eliminar este usuario')
    }

    const query = this.usuarioRepository.createQueryBuilder()
    const eliminar = query
      .delete()
      .where({
        id: user.id,
      })
      .execute()

    const guardarLog = this.logUsuarioRepository.save(logUsuario)

    try {

      // Utilizo promise All para que si cualquiera de las dos acciones (Promesas) falla, todas se invaliden
      await Promise.all([eliminar, guardarLog])
      return {
        msg: `Usuario eliminado satisfactoriamente por el motivo: ${ eliminarUsuarioDto.motivo }`
      }

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error al eliminar usuario')
    }


  }
}
