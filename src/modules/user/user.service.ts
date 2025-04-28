import { Injectable } from '@nestjs/common'
import { ClsService, InjectCls } from 'nestjs-cls'

@Injectable()
export class UserService {
    constructor(@InjectCls() readonly cls: ClsService) {}

    log(message: string) {
        console.log(`${this.cls.getId()} > ${message}`)
    }
}
