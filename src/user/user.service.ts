import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async auth(createUserDto: CreateUserDto) {
    if (createUserDto.tgId == undefined) {
      return await this.usersRepository.save(new User());
    }
    const user = await this.usersRepository.findOneBy({
      id: createUserDto.tgId,
    });

    return !user ? await this.usersRepository.save(new User()) : user;
  }
}
