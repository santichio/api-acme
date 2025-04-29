import { deploymentEnviromentsEnum } from '../enums/deploymentEnviroments.enum'
import { enviromentsEnum } from '../enums/enviroments.enum'

export interface EnvFileInterface {
    NODE_ENV: enviromentsEnum
    DEPLOYMENT: deploymentEnviromentsEnum
    API_PORT: number
    API_HOST: string
    API_TIMEOUT_MILLIS: number
    DATABASE_CONNECTION_HOST: string
    DATABASE_CONNECTION_PORT: number
    DATABASE_CONNECTION_USER: string
    DATABASE_CONNECTION_PASSWORD: string
    DATABASE_CONNECTION_MAX_POOL_SIZE: number
    DATABASE_CONNECTION_IDLE_TIMEOUT_MILLIS: number
    DATABASE_CONNECTION_AUTO_SYNC: boolean
    DATABASE_USER: string
}
