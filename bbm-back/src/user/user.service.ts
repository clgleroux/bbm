import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findUserEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (findUserEmail) {
      throw new Error('Unique email');
    }

    if (!this.validateEmail(createUserDto.email)) {
      throw new Error('Email not valid');
    }

    return await this.userRepository.create({
      email: createUserDto.email,
      pseudo: createUserDto.pseudo,
      dateOfBirth: createUserDto.dateOfBirth,
    });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // TODO : Sécuriser

    return await this.userRepository.update(
      {
        email: updateUserDto.email,
        pseudo: updateUserDto.pseudo,
        dateOfBirth: updateUserDto.dateOfBirth,
      },
      { where: { id } },
    );
  }

  validateEmail(email): boolean {
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
  }
}
