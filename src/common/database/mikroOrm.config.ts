import { defineConfig, Options } from '@mikro-orm/postgresql'
import { Migrator } from '@mikro-orm/migrations'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

import { IDatabaseOptions } from '../config/interfaces/ConfigOptions.interface'
import { envEnum } from '../config/enums/env.enum'

/**
 * Build a MikroORM connection options object, based on node enviroment.
 * If have more than one database connections, provide a context name for all.
 * @param options object of database config
 * @param enviroment enviroment enum ( prd | hml | dev | loc )
 * @param dbName database name
 * @param contextName context name
 * @returns MikroORM options object
 */
export function mikroOrmConfig(
    options: IDatabaseOptions,
    enviroment: envEnum,
    dbName: string,
    contextName?: string
): Options {
    // Construct base options object
    const baseOptionsObj: Options = {
        host: options.host,
        port: options.port,
        user: options.username,
        password: options.password,
        dbName,
        entities: ['./dist/**/*.entity.js'],
        entitiesTs: ['./src/**/*.entity.ts'],
        strict: true,
        forceUtcTimezone: true,
        migrations: {
            path: 'dist/modules/database/migrations',
            pathTs: 'src/modules/database/migrations',
            transactional: true,
            allOrNothing: true
        },
        pool: {
            min: 5,
            max: options.maxPoolSize,
            idleTimeoutMillis: options.idleTimeoutMillis
        },
        extensions: [Migrator],
        schemaGenerator: {
            disableForeignKeys: false
        },
        persistOnCreate: true
    }

    // Include context name if it provided
    const optionsObj = contextName
        ? { ...baseOptionsObj, contextName }
        : baseOptionsObj

    // Return and include dev options if node enviroment is DEVELOP or LOCALHOST
    if (enviroment === envEnum.DEVELOP || envEnum.LOCALHOST) {
        const highlighter = new SqlHighlighter()

        return defineConfig({
            ...optionsObj,
            debug: ['info', 'discovery'], // Check Logging section in MikroORM documentation
            highlighter
        })
    }

    // Return options
    return defineConfig(optionsObj)
}
