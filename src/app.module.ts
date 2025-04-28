import { Module } from '@nestjs/common'

import { DatabaseModule } from './common/database/database.module'
import { UserModule } from './modules/user/user.module'
import { ConfigModule } from './common/config/config.module'

@Module({
    imports: [ConfigModule.register(), DatabaseModule.register(), UserModule],
    controllers: [],
    providers: []
})
export class AppModule {}
