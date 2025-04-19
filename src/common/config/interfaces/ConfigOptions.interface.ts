import { envEnum } from '../enums/env.enum'

export interface ConfigOptionsInterface {
    env: EnvOptionsInterface
    api: ApiOptionsInterface
    database: DatabaseOptionsInterface
}

export interface EnvOptionsInterface {
    nodeEnv?: envEnum
}

export interface ApiOptionsInterface {
    port?: number
    host?: string
}

export interface DatabaseOptionsInterface {
    connectionHost: string | undefined
    connectionPort: number | undefined
    connectionUser: string | undefined
    connectionPassword: string | undefined
    ormMaxPoolSize?: number | undefined
    ormIdleTimeoutMillis?: number | undefined
    ormAutoSync?: boolean | undefined
    // For each new database, provide a key
    dbNameUser: string | undefined
}
