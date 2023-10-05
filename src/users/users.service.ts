import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {email:email}
    });
  }

  
}