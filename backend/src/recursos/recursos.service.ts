import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRecursoDto } from './dto/create-recurso.dto';
import { UpdateRecursoDto } from './dto/update-recurso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recurso } from './entities/recurso.entity';
import { Repository } from 'typeorm';
import { Administradores } from 'src/auth/entities/auth.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { PaginationDto } from './dto/paginacion.dto';
import { BusquedaDto } from './dto/busqueda.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { LogUsuario } from 'src/usuarios/entities/log-usuario.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class RecursosService {

  constructor(
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
    private readonly usuarioService: UsuariosService,
    @InjectRepository(LogUsuario)
    private readonly logUsuarioRepository: Repository<LogUsuario>
  ) { }

  async create(createRecursoDto: CreateRecursoDto, administrador: Administradores) {

    const usuario = await this.usuarioService.findOne(createRecursoDto.usuarioId)

    const recurso = this.recursoRepository.create({
      ...createRecursoDto,
      tipo: createRecursoDto.tipo,
      administrador,
      usuario
    })

    await this.recursoRepository.save(recurso)

    delete recurso.administrador.contrasena

    return {
      msg: 'Recurso creado satisfactoriamente',
      recurso
    }

  }

  async findAll(paginationDto: IPaginationOptions, administrador: Administradores) {

    const queryBuilder =  this.recursoRepository.createQueryBuilder('recurso');

    await queryBuilder
    .where('recurso.administradorId = :id ', { id: administrador.id })
    .leftJoinAndSelect('recurso.usuario', 'usuario')
    .getMany()


    return paginate(queryBuilder, paginationDto)

  }

  async findOne(id: string, administrador: Administradores) {
    const recurso = await this.recursoRepository.findOne({
      where: {
        id,
        administrador
      },
      relations: {
        usuario: true
      }
    })

    if (!recurso) {
      throw new NotFoundException(`Recurso con el id: ${id} no encontrado`)
    }

    return recurso
  }

  async update(id: string, updateRecursoDto: UpdateRecursoDto, administrador: Administradores) {

    const recurso = await this.findOne(id, administrador)

    try {

      const update = await this.recursoRepository.save({
        ...recurso,
        ...updateRecursoDto,
      })

      return {
        msg: 'Recurso actualizado correctamente',
        update
      }

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ha ocurrido un error al actualizar el recuros, intrente de nuevo')
    }
  }

  async buscar(parametroBusueda: BusquedaDto, administrador: Administradores) {

    let usuario: Usuario

    let recursosFiltrados: Recurso[]

    if (parametroBusueda.usuarioId) {
      usuario = await this.usuarioService.findOne(parametroBusueda.usuarioId)
    }
    const recurso = await this.recursoRepository.find({
      where: {
        administrador,
        ...(parametroBusueda.usuarioId && { usuario }),
        ...(parametroBusueda.tipo && { tipo: parametroBusueda.tipo })
      },
      relations: {
        usuario: true
      }
    })

    if (parametroBusueda.nombre) {
        recursosFiltrados = recurso.filter(rec => rec.nombre.toLowerCase().includes(parametroBusueda.nombre.toLowerCase()))

        return {
          recursosFiltrados
        }
    }

    return {
      recursosFiltrados: recurso
    }
  }

  async remove(id: string, administrador: Administradores) {

    const recurso = await this.findOne(id, administrador);

    const query = this.recursoRepository.createQueryBuilder()

    try {

      await query
        .delete()
        .where({
          id: recurso.id,
          administrador
        })
        .execute()

      return {
        msg: 'Recurso eliminado satisfactoriamente'
      }

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ha ocurrido un error al eliminar el recuros, intrente de nuevo')
    }

  }
}
