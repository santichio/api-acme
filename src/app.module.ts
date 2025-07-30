import { Module } from '@nestjs/common'

import { CommonModule } from './common/common.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [CommonModule, UserModule],
    controllers: [],
    providers: []
})
export class AppModule {}
