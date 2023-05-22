import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Administradores } from 'src/auth/entities/auth.entity';


@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();

    const user = req.user as Administradores;

    if (!user) {
      throw new BadRequestException('User not found')
    }
    
    return true;
  }
}
