import * as Joi from 'joi'
import { envEnum } from '../enums/env.enum'

export const envOptionsSchema = {
    NODE_ENV: Joi.string()
        .valid(...Object.values(envEnum))
        .default(envEnum.DEVELOP)
}
