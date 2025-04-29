import { Module } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'

@Module({
    imports: [ConfigModule.register(), DatabaseModule.register()],
    providers: []
})
export class CommonModule {}
