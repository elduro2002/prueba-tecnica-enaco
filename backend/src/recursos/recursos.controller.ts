import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { CreateRecursoDto } from './dto/create-recurso.dto';
import { UpdateRecursoDto } from './dto/update-recurso.dto';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user/get-user.decorator';
import { Administradores } from 'src/auth/entities/auth.entity';
import { PaginationDto } from './dto/paginacion.dto';
import { BusquedaDto } from './dto/busqueda.dto';

@Controller('recursos')
export class RecursosController {
  constructor(private readonly recursosService: RecursosService) { }

  @Post()
  @Auth()
  create(
    @Body() createRecursoDto: CreateRecursoDto,
    @GetUser() administrador: Administradores
  ) {
    console.log(createRecursoDto)
    return this.recursosService.create(createRecursoDto, administrador);
  }

  @Get()
  @Auth()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @GetUser() admin: Administradores
  ) {

    const Pagination = { 
      page,
      limit
    }

    return this.recursosService.findAll(Pagination, admin);
  }

  @Get(':id')
  @Auth()
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() admin: Administradores
  ) {
    return this.recursosService.findOne(id, admin);
  }

  @Get('b/busqueda')
  @Auth()
  buscar(
    @Query() parametro: BusquedaDto,
    @GetUser() admin: Administradores
  ) {
    return this.recursosService.buscar(parametro, admin)
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateRecursoDto: UpdateRecursoDto,
    @GetUser() admin: Administradores) {
    return this.recursosService.update(id, updateRecursoDto, admin);
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @GetUser() admin: Administradores,
    // @Body removeRecurso: 
  ) {
    return this.recursosService.remove(id, admin);
  }
}
