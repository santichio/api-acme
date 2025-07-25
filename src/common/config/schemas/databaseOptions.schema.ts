import * as Joi from 'joi'

export const databaseOptionsSchema = {
    DATABASE_HOST: Joi.string().hostname().required(),
    DATABASE_PORT: Joi.number().port().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_MAX_POOL_SIZE: Joi.number().default(40),
    DATABASE_IDLE_TIMEOUT_MILLIS: Joi.number().default(10000),
    DATABASE_AUTO_SYNC: Joi.boolean().default(false)
}
