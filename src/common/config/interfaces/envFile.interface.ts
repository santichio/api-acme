import { deployEnum } from '../enums/deploy.enum'
import { envEnum } from '../enums/env.enum'

export interface IEnvFile {
    // Environment options
    ENV_NODE: envEnum
    ENV_DEPLOY: deployEnum

    // API configuration options
    API_PORT: number
    API_HOST: string
    API_TIMEOUT_MILLIS: number

    // Database configuration options
    DATABASE_HOST: string
    DATABASE_PORT: number
    DATABASE_USERNAME: string
    DATABASE_PASSWORD: string
    DATABASE_MAX_POOL_SIZE: number
    DATABASE_IDLE_TIMEOUT_MILLIS: number
    DATABASE_AUTO_SYNC: boolean
    DATABASE_NAME_USER: string
}
