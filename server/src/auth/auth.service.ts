import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwt: JwtService,
  ) {}

  async signUp({
    email,
    password,
  }: SignUpDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException({ type: 'email-exists' });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.usersService.create(email, hash, salt);

    const accessToken = await this.jwt.signAsync({
      id: newUser.id,
      email: newUser.email,
    });

    return { accessToken };
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.passwordHash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwt.signAsync({
      id: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
