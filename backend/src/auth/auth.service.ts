import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Administradores } from './entities/auth.entity';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Administradores)
    private readonly adminRepository: Repository<Administradores>,
    private readonly jwtService: JwtService
  ) { }

  async create(registerAdminDto: RegisterAdminDto) {

    try {
      const { contrasena, ...rest } = registerAdminDto;

      const user = this.adminRepository.create({
        ...rest,
        contrasena: bcrypt.hashSync(contrasena, 10)
      })

      await this.adminRepository.save(user);
      delete user.contrasena

      return {
        ...user,
        token: this.getJWT({ id: user.id })
      }

    } catch (error) {
      console.log(error)
      this.handleErrors(error)

    }
  }

  async login(loginuserDto: LoginUserDto) {


    const { contrasena, usuario } = loginuserDto;

    const user = await this.adminRepository.findOne({
      where: {
        usuario
      },
    })

    if (!user) {
      throw new NotFoundException('Error de creedenciales (Usuario)')
    }

    if (!bcrypt.compareSync(contrasena, user.contrasena)) throw new UnauthorizedException('Error de creedenciales (Contraseña)')
    delete user.contrasena;
    return {
      ...user,
      token: this.getJWT({ id: user.id })
    }

  }

  findAll() {
    return `This action returns all auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJWT(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleErrors(errors: any): never {
    if (errors.code === '23505') {
      throw new BadRequestException(errors.detail)
    }
    throw new InternalServerErrorException(`Server internal error, please check server logs`)
  }
}
