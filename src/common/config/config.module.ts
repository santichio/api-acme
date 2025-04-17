import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            ignoreEnvFile: false // Change to false to load .env files
        })
    ]
})
export class ConfigModule {}
