import * as Joi from 'joi'

import { enviromentOptionsSchema } from './enviromentOptions.schema'
import { apiOptionsSchema } from './apiOptions.schema'
import { databaseOptionsSchema } from './databaseOptions.schema'

export const configOptionsSchema = Joi.object({
    ...enviromentOptionsSchema,
    ...apiOptionsSchema,
    ...databaseOptionsSchema
})
