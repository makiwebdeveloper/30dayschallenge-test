import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { IDay } from './days.types';

@Injectable()
export class DaysService {
  constructor(private db: DbService) {}

  async getDaysByChallangeId(userToChallangeId: string): Promise<IDay[]> {
    return this.db.day.findMany({
      where: {
        challangeId: userToChallangeId,
      },
    });
  }

  async createDay(number: number, userToChallangeId: string): Promise<IDay> {
    return this.db.day.create({
      data: {
        number,
        challangeId: userToChallangeId,
      },
    });
  }
}
