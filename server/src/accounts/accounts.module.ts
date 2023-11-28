import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
