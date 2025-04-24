import * as Joi from 'joi'

export const databaseOptionsSchema = {
    DATABASE_CONNECTION_HOST: Joi.string().hostname().required(),
    DATABASE_CONNECTION_PORT: Joi.number().port().required(),
    DATABASE_CONNECTION_USER: Joi.string().required(),
    DATABASE_CONNECTION_PASSWORD: Joi.string().required(),
    DATABASE_CONNECTION_MAX_POOL_SIZE: Joi.number().default(40),
    DATABASE_CONNECTION_IDLE_TIMEOUT_MILLIS: Joi.number().default(10000),
    DATABASE_CONNECTION_AUTO_SYNC: Joi.boolean().default(false),
    DATABASE_USER: Joi.string().default('db_user')
}
