import * as Joi from 'joi'

import { envOptionsSchema } from './envOptions.schema'
import { apiOptionsSchema } from './apiOptions.schema'
import { databaseOptionsSchema } from './databaseOptions.schema'

export const configOptionsSchema = Joi.object({
    ...envOptionsSchema,
    ...apiOptionsSchema,
    ...databaseOptionsSchema
})
