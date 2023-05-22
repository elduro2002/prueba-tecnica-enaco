import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';;
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginUserDto } from './dto';
import { Auth } from './decorators/auth/auth.decorator';
import { GetUser } from './decorators/get-user/get-user.decorator';
import { Administradores } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() registerAdminDto: RegisterAdminDto) {
    return this.authService.create(registerAdminDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
      return this.authService.login(loginUserDto)
  } 

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Auth()
  @Get('usuario')
  obtenerUsuario(
    @GetUser() admin: Administradores
  ){
    delete admin.contrasena
    return {
      ...admin
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
