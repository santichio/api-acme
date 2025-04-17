import { DynamicModule, Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { defineConfig } from '@mikro-orm/postgresql'

@Module({})
export class DatabaseModule {
    static register(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                MikroOrmModule.forRootAsync({
                    useFactory: () => {
                        return {
                            ...defineConfig({
                                host: process.env.DATABASE_HOST || 'localhost',
                                port: Number(process.env.DATABASE_PORT) || 5432,
                                user: process.env.DATABASE_USER || 'acme',
                                password:
                                    process.env.DATABASE_PASSWORD || 'acme@123',
                                dbName: process.env.DATABASE_NAME || 'acme',
                                entities: ['dist/**/*.entity.js'],
                                entitiesTs: ['src/**/*.entity.ts'],
                                debug: process.env.NODE_ENV !== 'production',
                                migrations: {
                                    path: 'dist/migrations',
                                    pathTs: 'src/migrations',
                                    glob: '!(*.d).{js,ts}',
                                    transactional: true,
                                    allOrNothing: true
                                },
                                pool: {
                                    min: 2,
                                    max: 10
                                },
                                allowGlobalContext: true
                            })
                        }
                    }
                })
            ]
        }
    }
}
