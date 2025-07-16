import { Controller, Get } from '@nestjs/common'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async log() {
        const something = await this.userService.log()

        return {
            message: 'returning something!',
            data: something,
            metadata: {
                pagination: {
                    test: 'test'
                },
                test: 'test'
            },
            test: 'test'
        }

        return 'controller return'
    }
}
