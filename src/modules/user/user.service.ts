import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { ClsService, InjectCls } from 'nestjs-cls'
import { IPreResponse } from 'src/common/interfaces/Response.interface'

@Injectable()
export class UserService {
    constructor(@InjectCls() readonly cls: ClsService) {}

    async log() {
        // console.log(`${this.cls.getId()} > ${message}`)

        return {
            message: 'You got a banana!',
            data: 'banana'
        }

        // return 'banana'

        // return {
        //     banana: 'banana'
        // }

        // throw new NotFoundException()

        // throw new Error('Banana')

        // await new Promise(() =>
        //     setTimeout(() => {
        //         return {
        //             banana: 'TIMEOUT'
        //         }
        //     }, 3001)
        // )
    }
}
