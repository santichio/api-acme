import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { TimeoutInterceptor } from './interceptors/Timeout.interceptor'
import { GlobalExceptionFilter } from './filters/GlobalException.filter'

@Module({
    imports: [ConfigModule.register(), DatabaseModule.register('acme')],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
        { provide: APP_FILTER, useClass: GlobalExceptionFilter }
    ]
})
export class CommonModule {}
