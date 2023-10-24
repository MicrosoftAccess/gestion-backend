import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BehaviorSubject, Subject, first } from 'rxjs';
import { IToken } from 'src/interfaces/users.interfaces';
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

    //TODO: traer nrc en el token para mostrar los nrcs en el dropdown
    const payload = { sub: user.id, email: user.email,role:user.role,name:user.name,surname:user.surname };
    // console.log(await this._jwtService.signAsync(payload))
    return { access_token: await this._jwtService.signAsync(payload) };
  }
  getCurrentToken(){
    return  this.token$.value;
  }

  async getCurrentUserInfo(){
    const test = this.getCurrentToken()
    console.log("current_token: ",test);
    
    const token: IToken = this._jwtService.decode(test.split(' ')[1]) as IToken;
    return token
    
  }
}
