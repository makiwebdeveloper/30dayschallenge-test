import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async findByEmail(email: string): Promise<User> {
    return this.db.user.findUnique({ where: { email } });
  }

  async create(email: string, hash: string, salt: string): Promise<User> {
    return this.db.user.create({ data: { email, passwordHash: hash, salt } });
  }
}
