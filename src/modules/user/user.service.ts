import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { ClsService, InjectCls } from 'nestjs-cls'

@Injectable()
export class UserService {
    constructor(@InjectCls() readonly cls: ClsService) {}

    log(message: string) {
        // console.log(`${this.cls.getId()} > ${message}`)

        // return {
        //     data: 'banana'
        // }

        throw new NotFoundException()

        // throw new Error('Banana')

        // return new Promise(() =>
        //     setTimeout(() => {
        //         console.log(message)
        //     }, 3001)
        // )
    }
}
