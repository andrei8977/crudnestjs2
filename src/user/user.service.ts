import { PrismaService } from "../prisma.service";
import { User } from "./user.model";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { NotFoundException } from "@nestjs/common";
import { TokenService } from "../token/token.service";

@Injectable()
export class UserService{
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService
  ){}

  async getAllUser(): Promise<User[]>{
    return this.prisma.user.findMany()
  }

  async getUser(id:number): Promise<User | null>{
    let user = await this.prisma.user.findUnique({where: {id: Number(id)}})
    if (!user){
      throw new NotFoundException ("User Not Found")
    }
    return user;
  }


  async createUser(data: CreateUserDto): Promise<User>{
    return this.prisma.user.create({
      data,
    })
  }

  async updateUser(id:number,data:UpdateUserDto): Promise<User>{

    let user = await this.prisma.user.findUnique({where: {id: Number(id)}})
    if (!user){
      throw new NotFoundException ("User Not Found")
    }

    return this.prisma.user.update({
      where: {id:Number(id)},
      data:{email: data.email, password: data.password}
    })
  }

  async deleteUser(id:number):Promise<User>{

    let user = await this.prisma.user.findUnique({where: {id: Number(id)}})
    if (!user){
      throw new NotFoundException ("User Not Found")
    }

    return this.prisma.user.delete({
      where: {id: Number(id)}
    })
  }


  async getAdminJwtToken(payload: any){
    const token = await this.tokenService.generateJwtToken(payload.role)
    return token
  }





}