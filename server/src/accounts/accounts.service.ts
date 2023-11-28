import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Account } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private db: DbService) {}

  async findByUsername(username: string): Promise<Account> {
    return this.db.account.findUnique({ where: { username } });
  }

  async create(username: string, hash: string, salt: string): Promise<Account> {
    return this.db.account.create({
      data: { username, passwordHash: hash, salt },
    });
  }
}
