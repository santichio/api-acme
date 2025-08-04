import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: EntityRepository<UserEntity>,
        private readonly em: EntityManager
    ) {}

    async createUser(payload: CreateUserDto) {
        const user = this.userRepository.create(payload, {
            managed: true,
            partial: true
        })

        console.log(user)

        try {
            await this.em.persistAndFlush(user)

            return true
        } catch (err) {
            console.log('banana')

            throw new InternalServerErrorException(
                
            )
        }
    }

    findAllUsers() {
        return `This action returns all user`
    }

    findOne(id: number) {
        return `This action returns a #${id} user`
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
