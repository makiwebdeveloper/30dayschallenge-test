import { Module } from '@nestjs/common';
import { ChallangesController } from './challanges.controller';
import { ChallangesService } from './challanges.service';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/users/users.module';
import { DaysModule } from 'src/days/days.module';

@Module({
  imports: [DbModule, UsersModule, DaysModule],
  controllers: [ChallangesController],
  providers: [ChallangesService],
})
export class ChallangesModule {}
