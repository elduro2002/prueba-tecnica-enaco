import { Module } from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { RecursosController } from './recursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recurso } from './entities/recurso.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [RecursosController],
  providers: [RecursosService],
  imports: [
    TypeOrmModule.forFeature([Recurso]),
    AuthModule,
    UsuariosModule
  ]
})
export class RecursosModule { }
