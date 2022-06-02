import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { LoginDto } from '../models/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('check')
    async checkContraseña(@Body() loginDto: LoginDto): Promise<boolean> {
        const valid = await this.authService.validateUser(loginDto.email, loginDto.password);
        return valid;
    }
    
    @Post('checkToken')
    async checkToken(@Body() token: any): Promise<boolean> {
        const valid = await this.authService.checkToken(token);
        return valid;
    }

    @Post()
    async login(@Body() loginDto: LoginDto): Promise<Observable<{ access_token: string; }>> {
        const valid = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (valid === false) {
            throw new UnauthorizedException();
        }
        return from(this.authService.generateAccessToken(loginDto.email));
    }
}
