import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Res, UseFilters, UseGuards, ValidationPipe } from "@nestjs/common";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateJwtDto } from "./dto/create-jwt.dto";

import { JwtAuthGuard } from "src/guards/jwt-guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";



@Controller('api/v1/user')
export class UserController{

  constructor(private readonly userService: UserService){}

  @Get()
  @ApiTags('Get all users without JWT authorization')
  async getAllUser(@Req() request:Request, @Res() response:Response ):Promise <any>{
    const result = await this.userService.getAllUser()
    return response.status(200).json({
      status: "Ok!",
      message: "Successfully fetch data!",
      result: result
    })      
  }

  @Post('/login:role')
  @ApiTags('Get JWT token for authorization')
  async getUserToken(@Body(ValidationPipe) createJwtDto: CreateJwtDto){

    let body_response = {}
    if (createJwtDto.role === "admin"){
      body_response["JWT_TOKEN"] = await this.userService.getAdminJwtToken(createJwtDto)
    } else {
      body_response["ERROR"] = "You are not admin - we can't provide JWT Token"
    }

    return body_response
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('Get all users with JWT authorization')
  @Get('/secured')
  async getAllUserSecuredWithJWT(@Req() request:Request, @Res() response:Response ):Promise <any>{
    const result = await this.userService.getAllUser()
    return response.status(200).json({
      status: "Ok!",
      message: "Successfully fetch data!",
      result: result
    })      
  }

  @Post()
  @ApiTags('Create a new user')
  async postUser(@Body(ValidationPipe) createUserDto: CreateUserDto):Promise<User>{
    return this.userService.createUser(createUserDto)
  }

  
  @Get(':id')
  @ApiTags('Get user by id')
  async getUser(@Param('id', ParseIntPipe) id:number):Promise<User | null>{
    return this.userService.getUser(id)
  }

  @Delete(':id')
  @ApiTags('Delete user')
  async deleteUser(@Param('id', ParseIntPipe) id:number):Promise<User>{
    return this.userService.deleteUser(id)
  }

  @Put(':id')
  @ApiTags('Update user')
  async updateUser(@Param('id', ParseIntPipe) id:number,@Body(ValidationPipe) updateUserDto: UpdateUserDto):Promise<User>{
    return this.userService.updateUser(id, updateUserDto)
  }

}
