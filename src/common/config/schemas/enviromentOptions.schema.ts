import * as Joi from 'joi'

import { enviromentsEnum } from '../enums/enviroments.enum'
import { deploymentEnviromentsEnum } from '../enums/deploymentEnviroments.enum'

export const enviromentOptionsSchema = {
    NODE_ENV: Joi.string()
        .valid(...Object.values(enviromentsEnum))
        .default(enviromentsEnum.DEVELOP),
    DEPLOYMENT: Joi.string()
        .valid(...Object.values(deploymentEnviromentsEnum))
        .default(deploymentEnviromentsEnum.LOCALHOST)
}
