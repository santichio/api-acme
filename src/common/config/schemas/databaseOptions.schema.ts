import * as Joi from 'joi'

export const databaseOptionsSchema = {
    DATABASE_CONNECTION_HOST: Joi.string().hostname().required(),
    DATABASE_CONNECTION_PORT: Joi.number().port().required(),
    DATABASE_CONNECTION_USER: Joi.string().required(),
    DATABASE_CONNECTION_PASSWORD: Joi.string().required(),
    DATABASE_ORM_MAX_POOL_SIZE: Joi.number().default(40),
    DATABASE_ORM_IDLE_TIMEOUT_MILLIS: Joi.number().default(10000),
    DATABASE_ORM_AUTO_SYNC: Joi.boolean().default(false),
    // For each database, include a env variable
    DATABASE_NAME_USER: Joi.string().default('db_user')
}
