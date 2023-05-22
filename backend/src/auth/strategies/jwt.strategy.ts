import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Administradores } from "../entities/auth.entity";
import { JwtPayload } from "../interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

// Esto se llama estrategia, se utliza para validar la autenticacion con JWT (JSON WEB TOKENS)

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(Administradores)
        private readonly AdminReoository: Repository<Administradores>,
        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }


    async validate(payload: JwtPayload): Promise<Administradores> {

        const { id } = payload

        const user = await this.AdminReoository.findOneBy({ id })

        if(!user) {
            throw new UnauthorizedException('Token no valido')
        }

        return user
    }
}