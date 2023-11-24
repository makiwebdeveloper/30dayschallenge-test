import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCreatedResponse()
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiOkResponse()
  @Put(':id')
  async updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(id, body);
  }

  @ApiOkResponse()
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
