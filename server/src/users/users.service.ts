import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Account, User } from '@prisma/client';
import { IUser } from './users.types';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    const user = await this.db.user.create({
      data,
      include: { account: true },
    });

    return this.formatUser(user);
  }

  async updateUser(userId: string, data: UpdateUserDto): Promise<IUser> {
    const user = await this.db.user.update({
      where: {
        id: userId,
      },
      data,
      include: {
        account: true,
      },
    });

    return this.formatUser(user);
  }

  async getUserById(userId: string): Promise<IUser | undefined> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { account: true },
    });

    return this.formatUser(user);
  }

  async getUsers(username?: string): Promise<IUser[]> {
    const users = await this.db.user.findMany({
      where: {
        account: {
          username: {
            contains: username,
          },
        },
      },
      include: {
        account: true,
      },
    });

    return users.map((user) => this.formatUser(user));
  }

  async getUserByAccountId(accountId: string) {
    console.log(accountId);
    const user = await this.db.user.findUnique({
      where: {
        accountId,
      },
      include: { account: true },
    });

    return this.formatUser(user);
  }

  formatUser(user: User & { account: Account }): IUser {
    const { id, createdAt, updatedAt, name, imageUrl, account } = user;

    const formatedUser = {
      id,
      createdAt,
      updatedAt,
      name,
      imageUrl,
      username: account.username,
    };

    return formatedUser;
  }
}
