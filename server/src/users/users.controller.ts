import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCreatedResponse()
  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiOkResponse()
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(id, body);
  }

  @ApiOkResponse()
  @ApiQuery({
    name: 'username',
    type: String,
    required: false,
  })
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query('username') username?: string) {
    return this.usersService.getUsers(username);
  }

  @ApiOkResponse()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
