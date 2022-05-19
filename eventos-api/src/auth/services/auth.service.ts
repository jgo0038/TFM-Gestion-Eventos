import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosEntity } from 'src/usuarios/models/usuarios.entity';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';

@Injectable()
export class AuthService {

    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService,
      ) {}
    
      async validateUser(email: string, password: string): Promise<boolean> {
        const user: UsuariosEntity = await this.usuariosService.getUsuarioByEmail(email);
        if (user) 
            return await user.validarContraseña(password);
        return null;
      }

      async generateAccessToken(email: string): Promise<{ access_token: string }> {
        const user: UsuariosEntity = await this.usuariosService.getUsuarioByEmail(email);
        const payload = { mail: user.mail };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
