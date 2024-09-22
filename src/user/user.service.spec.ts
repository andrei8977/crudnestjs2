import { TokenService } from "../token/token.service"
import { PrismaService } from "../prisma.service"
import { UserService } from "./user.service"
import { Test } from "@nestjs/testing"

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {

              findUnique: jest.fn().mockResolvedValue([
                {
                  id: 1,
                  email: "test1@mail.com",
                  password: "test1password"
                },

                null
              ]),

              findMany: jest.fn().mockResolvedValue([
                {
                  id: 1,
                  email: "test1@mail.com",
                  password: "test1password"
                },
              ]),

              
            }

          }
        },

        {
          provide: TokenService,
          useValue:  {
          }
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should return a user', async () => {
    expect(await service.getUser(1)).toEqual([
      {
        id: 1,
        email: "test1@mail.com",
        password: "test1password"
      },
      
      null
    ])
  })


  it('should return an array of users', async () => {
    expect(await service.getAllUser()).toEqual([
      {
        id: 1,
        email: "test1@mail.com",
        password: "test1password"
      },
    ])
  })


})