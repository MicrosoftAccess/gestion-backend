import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BehaviorSubject, Subject, first } from 'rxjs';
import { UsersService } from 'src/users/users.service';
//logica
@Injectable()
export class AuthService {
  token$:BehaviorSubject<string> = new BehaviorSubject('');
  constructor(
    private _usersService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this._usersService.findOne(email);

    if(!user){
      throw new UnauthorizedException();
    }

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return { access_token: await this._jwtService.signAsync(payload) };
  }
  getCurrentToken(){
    return  this.token$.value;
  }

 
}
