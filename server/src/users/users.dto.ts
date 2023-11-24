import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Watson',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://test.com/test-image.jpg',
  })
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    example: 'account-id',
  })
  @IsNotEmpty()
  accountId: string;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Watson',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://test.com/test-image.jpg',
  })
  @IsNotEmpty()
  imageUrl: string;
}
