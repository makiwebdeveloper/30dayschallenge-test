import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateChallangeDto, UpdateChallangeDto } from './challanges.dto';
import { UsersService } from 'src/users/users.service';
import { DaysService } from 'src/days/days.service';
import { IChallange } from './challanges.types';

@Injectable()
export class ChallangesService {
  constructor(
    private db: DbService,
    private usersService: UsersService,
    private daysService: DaysService,
  ) {}

  async getChallangeById(id: string): Promise<IChallange> {
    const challange = await this.db.challange.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              include: {
                account: true,
              },
            },
            days: {
              orderBy: {
                number: 'asc',
              },
            },
          },
        },
        creator: {
          include: {
            account: true,
          },
        },
      },
    });

    return this.formatChallange(challange);
  }

  async getChallanges({ userId }: { userId?: string }): Promise<IChallange[]> {
    const challanges = await this.db.challange.findMany({
      include: {
        members: {
          where: {
            userId,
          },
          include: {
            user: {
              include: {
                account: true,
              },
            },
            days: {
              orderBy: {
                number: 'asc',
              },
            },
          },
        },
        creator: {
          include: {
            account: true,
          },
        },
      },
    });

    return challanges.map((challange) => this.formatChallange(challange));
  }

  async createChallange(data: CreateChallangeDto): Promise<IChallange> {
    const challange = await this.db.challange.create({ data });

    const userToChallange = await this.db.userToChallange.create({
      data: {
        userId: challange.creatorId,
        challangeId: challange.id,
      },
    });

    for (let i = 1; i <= 30; i++) {
      this.daysService.createDay(i, userToChallange.id);
    }

    return this.getChallangeById(challange.id);
  }

  async updateChallange(id: string, data: UpdateChallangeDto) {
    await this.db.challange.update({
      where: { id },
      data,
    });
  }

  async deleteChallange(id: string) {
    await this.db.challange.delete({
      where: { id },
    });
  }

  formatChallange(challange: any): IChallange {
    return {
      id: challange.id,
      createdAt: challange.createdAt,
      updatedAt: challange.updatedAt,
      title: challange.title,
      description: challange.description,
      creator: this.usersService.formatUser(challange.creator),
      members: challange.members.map((member) => ({
        ...member,
        user: this.usersService.formatUser(member.user),
      })),
    };
  }
}
