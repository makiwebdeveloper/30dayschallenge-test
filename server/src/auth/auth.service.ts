import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from './auth.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private passwordService: PasswordService,
    private jwt: JwtService,
  ) {}

  async signUp({
    username,
    password,
  }: SignUpDto): Promise<{ accessToken: string }> {
    const user = await this.accountsService.findByUsername(username);

    if (user) {
      throw new BadRequestException({ type: 'username-exists' });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.accountsService.create(username, hash, salt);

    const accessToken = await this.jwt.signAsync({
      id: newUser.id,
      username: newUser.username,
    });

    return { accessToken };
  }

  async signIn({ username, password }: SignInDto) {
    const user = await this.accountsService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.passwordHash) {
      throw new BadRequestException();
    }

    const accessToken = await this.jwt.signAsync({
      id: user.id,
      username: user.username,
    });

    return { accessToken };
  }
}
