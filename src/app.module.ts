import { Module } from '@nestjs/common'
import { DatabaseModule } from './common/database/database.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [DatabaseModule.register(), UserModule],
    controllers: [],
    providers: []
})
export class AppModule {}
