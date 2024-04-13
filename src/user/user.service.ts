import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async auth(authUserDto: AuthUserDto) {
    let user: User = await this.usersRepository.findOne({
      relations: {
        pages: true,
      },
      where: {
        tgId: authUserDto.tgId,
      },
    });

    if (!user || !user.tgId) {
      const newUser = new User();
      newUser.tgId = authUserDto.tgId;
      user = await this.usersRepository.save(newUser);
    }

    return user;
  }

  async findOne(tgId: number) {
    return await this.usersRepository.findOne({
      relations: {
        pages: true,
      },
      where: {
        tgId,
      },
    });
  }
}
