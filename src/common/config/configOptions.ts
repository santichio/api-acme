import * as dotenv from 'dotenv'
import * as Joi from 'joi'

import { ConfigOptionsInterface } from './interfaces/ConfigOptions.interface'
import { configOptionsSchema } from './schemas/configOptions.schema'
import { EnvFileInterface } from './interfaces/envFile.interface'
import { ErrorHandler } from 'src/utils/errorHandling/ErrorHandler'

/**
 * Validate .env properties to config module
 * Tries to find config file in root directory
 * @returns Configuration options
 */
export default async (): Promise<ConfigOptionsInterface> => {
    try {
        const envFile = dotenv.config({ path: './.env' }).parsed
        const values = (await configOptionsSchema.validateAsync(envFile, {
            abortEarly: false,
            cache: true
        })) as EnvFileInterface

        return {
            enviroment: {
                nodeEnv: values.NODE_ENV,
                deployment: values.DEPLOYMENT
            },
            api: {
                port: values.API_PORT,
                host: values.API_HOST,
                timeoutMillis: values.API_TIMEOUT_MILLIS
            },
            database: {
                connection: {
                    host: values.DATABASE_CONNECTION_HOST,
                    port: values.DATABASE_CONNECTION_PORT,
                    username: values.DATABASE_CONNECTION_USER,
                    password: values.DATABASE_CONNECTION_PASSWORD,
                    maxPoolSize: values.DATABASE_CONNECTION_MAX_POOL_SIZE,
                    idleTimeoutMillis:
                        values.DATABASE_CONNECTION_IDLE_TIMEOUT_MILLIS,
                    autoSync: values.DATABASE_CONNECTION_AUTO_SYNC
                },
                user: values.DATABASE_USER
            }
        }
    } catch (err) {
        if (err instanceof Joi.ValidationError) {
            throw ErrorHandler.envFileValidation(err)
        }

        throw ErrorHandler.generic(String(err))
    }
}
