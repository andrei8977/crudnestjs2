import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}

  async generateJwtToken(role: String){
    const payload = { role };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET_JWT'),
      expiresIn: this.configService.get('EXPIRE_JWT')
    })

  }

}
