import {
  Controller,
  Get,
  Post,
  UseGuards,
  Patch,
  Param,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateChallangeDto, UpdateChallangeDto } from './challanges.dto';
import { ChallangesService } from './challanges.service';

@ApiTags('Challanges')
@Controller('challanges')
export class ChallangesController {
  constructor(private challangesService: ChallangesService) {}

  @ApiOkResponse()
  @ApiQuery({
    name: 'userId',
    type: String,
    required: false,
  })
  @Get()
  async getChallanges(@Query('userId') userId?: string) {
    return this.challangesService.getChallanges({ userId });
  }

  @Get(':id')
  async getChallangeById(@Param('id') id: string) {
    return this.challangesService.getChallangeById(id);
  }

  @ApiCreatedResponse()
  @Post()
  @UseGuards(AuthGuard)
  async createChallange(@Body() body: CreateChallangeDto) {
    return this.challangesService.createChallange(body);
  }

  @Patch(':id')
  async updateChallange(
    @Param('id') id: string,
    @Body() body: UpdateChallangeDto,
  ) {
    return this.challangesService.updateChallange(id, body);
  }

  @Delete(':id')
  async deleteChallange(@Param('id') id: string) {
    return this.challangesService.deleteChallange(id);
  }
}
