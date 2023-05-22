import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administradores } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Administradores]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      // Esto se utiliza para obtener el JWT (JSON WEB TOKEN)
      useFactory: ( ConfigService: ConfigService ) => {
        return {
          secret: ConfigService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      },
    }),
    ConfigModule
  ],
  exports: [
    AuthService,
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
