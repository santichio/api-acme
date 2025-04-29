import { deploymentEnviromentsEnum } from '../enums/deploymentEnviroments.enum'
import { enviromentsEnum } from '../enums/enviroments.enum'

// Layer 0
export interface ConfigOptionsInterface {
    enviroment?: EnviromentOptionsInterface
    api?: ApiOptionsInterface
    database: DatabaseOptionsInterface
}

// Layer 1
export interface EnviromentOptionsInterface {
    nodeEnv?: enviromentsEnum
    deployment?: deploymentEnviromentsEnum
}

// Layer 1
export interface ApiOptionsInterface {
    port?: number
    host?: string
    timeoutMillis?: number
}

// Layer 1
export interface DatabaseOptionsInterface {
    connection: DatabaseConnectionOptionsInterface
    user: string
}

// Layer 2
export interface DatabaseConnectionOptionsInterface {
    host: string
    port: number
    username: string
    password: string
    maxPoolSize?: number
    idleTimeoutMillis?: number
    autoSync?: boolean
}
