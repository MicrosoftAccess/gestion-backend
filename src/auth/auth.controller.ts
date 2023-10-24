import { Controller, HttpStatus, HttpCode, Post, Body , Get, Headers} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsersDto } from 'src/users/users.dto';
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginUsersDto) {
    return this._authService.login(loginDto.email, loginDto.password);
  }
  @Get('login')
  userData(@Headers() headers:any){
    this._authService.token$.next(headers.authorization);
    return this._authService.getCurrentUserInfo()
  }

}
