import * as Joi from 'joi'

import { envEnum } from '../enums/env.enum'
import { deployEnum } from '../enums/deploy.enum'

export const enviromentOptionsSchema = {
    ENV_NODE: Joi.string()
        .valid(...Object.values(envEnum))
        .default(envEnum.DEVELOP),
    ENV_DEPLOY: Joi.string()
        .valid(...Object.values(deployEnum))
        .default(deployEnum.LOCALHOST)
}
