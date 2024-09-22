import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma.service";
import { TokenService } from "src/token/token.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/strategy";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, TokenService, JwtService, ConfigService, JwtStrategy]
})
export class UserModule{}