import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user/get-user.decorator';
import { Administradores } from 'src/auth/entities/auth.entity';
import { EliminarUsuarioDto } from './dto/elimininar-usuaro.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @Auth()
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @GetUser() administrador: Administradores
  ) {
    return this.usuariosService.create(createUsuarioDto, administrador);
  }

  @Get()
  @Auth()
  findAll(
    @GetUser() administrador: Administradores
  ) {
    return this.usuariosService.findAll(administrador);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @GetUser() admin: Administradores) {
    return this.usuariosService.update(id, updateUsuarioDto, admin);
  }

  @Delete(':id')
  @Auth()
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() admin: Administradores,
    @Body() eliminarUsuarioDto: EliminarUsuarioDto
    ) {
    return this.usuariosService.remove(id, admin, eliminarUsuarioDto);
  }
}
