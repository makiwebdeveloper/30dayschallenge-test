import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.db.user.create({ data });
  }

  async updateUser(userId: string, data: UpdateUserDto): Promise<User> {
    return this.db.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return this.db.user.findUnique({ where: { id: userId } });
  }
}
