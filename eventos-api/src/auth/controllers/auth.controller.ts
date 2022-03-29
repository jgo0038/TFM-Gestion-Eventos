import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { LoginDto } from '../models/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post()
    login(@Body() loginDto: LoginDto): Observable<{ access_token: string }> {
        const valid = this.authService.validateUser(loginDto.email, loginDto.password);
        if (!valid) {
            throw new UnauthorizedException();
        }
        return from(this.authService.generateAccessToken(loginDto.email));
    }
}
