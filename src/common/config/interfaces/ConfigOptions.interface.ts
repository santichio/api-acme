import { deployEnum } from '../enums/deploy.enum'
import { envEnum } from '../enums/env.enum'

// Layer 0
export interface IConfigOptions {
    env: IEnvOptions
    api: IApiOptions
    database: IDatabaseOptions
}

// Layer 1
export interface IEnvOptions {
    node: envEnum
    deploy: deployEnum
}

// Layer 1
export interface IApiOptions {
    port: number
    hos: string
    timeoutMillis: number
}

// Layer 1
export interface IDatabaseOptions {
    host: string
    port: number
    username: string
    password: string
    maxPoolSize: number
    idleTimeoutMillis: number
    autoSync: boolean
    nameDbUser: string
}
