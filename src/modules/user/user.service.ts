import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { userSuccessMessage } from 'src/lib/user.lib'

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

        try {
            await this.em.flush()

            return true
        } catch (err) {
            console.log(err)

            throw new InternalServerErrorException(
                userSuccessMessage(user.username).USER_CREATED
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
