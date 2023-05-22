import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LogUsuario } from './entities/log-usuario.entity';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([Usuario, LogUsuario]),
    AuthModule
  ],
  exports: [TypeOrmModule, UsuariosService]
})
export class UsuariosModule {}
