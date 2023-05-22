import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Administradores } from './auth/entities/auth.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { RecursosModule } from './recursos/recursos.module';


@Module({
  imports: [
    // Esto sirve para una inyeccion de dependencias para utilizar variables de entorno desde la dependencia ConfigModule
    ConfigModule.forRoot(),
    // Configuracion de la base de datos, en este caso se realizara con postgresSql
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, //localhost
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Administradores, Usuario]
    }),
    AuthModule,
    UsuariosModule,
    RecursosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
