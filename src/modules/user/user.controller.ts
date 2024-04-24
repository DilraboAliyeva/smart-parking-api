import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { DecoratorWrapper } from 'src/common/auth/decorator.wrapper';
import { Role } from 'src/common/auth/roles/role.enum';
import { LoginUserDto } from './dto/login-user.dto';
import { CoreApiResponse } from 'src/common/responce/core.responce';
import { SignupUserDto } from './dto/signup-user.dto';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @DecoratorWrapper('Login User', false)
  @Post('/login')
  async login(@Body() loginDto: LoginUserDto) {
    try {
      const result = await this.userService.login(loginDto);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Signup User', false)
  @Post('/signup')
  async signup(@Body() signupDto: SignupUserDto) {
    try {
      const result = await this.userService.signup(signupDto);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Create new User', true, [Role.Admin])
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      return CoreApiResponse.success(HttpStatus.CREATED, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get all Users', true, [Role.Admin])
  @Get()
  async findAll() {
    try {
      const result = await this.userService.findAll();
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Get User by ID', true, [Role.Admin])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.userService.findOne(+id);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Update User', true, [Role.Admin])
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userService.update(+id, updateUserDto);
      return CoreApiResponse.success(HttpStatus.OK, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }

  @DecoratorWrapper('Delete User', true, [Role.Admin])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.userService.remove(+id);
      return CoreApiResponse.success(HttpStatus.NO_CONTENT, result);
    } catch (error) {
      return CoreApiResponse.error(error);
    }
  }
}
