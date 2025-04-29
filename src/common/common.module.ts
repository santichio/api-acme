import { Module } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TimeoutInterceptor } from './interceptor/Timeout.interceptor'

@Module({
    imports: [ConfigModule.register(), DatabaseModule.register()],
    providers: [{ provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor }]
})
export class CommonModule {}
