import * as dotenv from 'dotenv'
import * as Joi from 'joi'

import { IConfigOptions } from './interfaces/ConfigOptions.interface'
import { configOptionsSchema } from './schemas/configOptions.schema'
import { IEnvFile } from './interfaces/envFile.interface'
import { ErrorHandler } from 'src/utils/errorHandling/ErrorHandler'

/**
 * Validate .env properties to config module
 * Tries to find config file in root directory
 * @returns Configuration options
 */
export default async (): Promise<IConfigOptions> => {
    try {
        const envFile = dotenv.config({ path: './.env' }).parsed
        const values = (await configOptionsSchema.validateAsync(envFile, {
            abortEarly: false,
            cache: true
        })) as IEnvFile

        return {
            env: {
                node: values.ENV_NODE,
                deploy: values.ENV_DEPLOY
            },
            api: {
                port: values.API_PORT,
                hos: values.API_HOST,
                timeoutMillis: values.API_TIMEOUT_MILLIS
            },
            database: {
                host: values.DATABASE_HOST,
                port: values.DATABASE_PORT,
                username: values.DATABASE_USERNAME,
                password: values.DATABASE_PASSWORD,
                maxPoolSize: values.DATABASE_MAX_POOL_SIZE,
                idleTimeoutMillis: values.API_TIMEOUT_MILLIS,
                autoSync: values.DATABASE_AUTO_SYNC,
                nameDbUser: values.DATABASE_NAME_USER
            }
        }
    } catch (err) {
        if (err instanceof Joi.ValidationError) {
            throw ErrorHandler.envFileValidation(err)
        }

        throw ErrorHandler.generic(String(err))
    }
}
