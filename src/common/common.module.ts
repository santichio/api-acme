import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { TimeoutInterceptor } from './interceptors/Timeout.interceptor'
import { ExceptionFilter } from './filters/Exception.filter'
import { ResponseInterceptor } from './interceptors/Response.interceptor'

@Module({
    imports: [ConfigModule.register(), DatabaseModule.register('acme')],
    providers: [
        { provide: APP_FILTER, useClass: ExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
    ]
})
export class CommonModule {}
