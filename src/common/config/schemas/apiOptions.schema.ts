import * as Joi from 'joi'

export const apiOptionsSchema = {
    API_PORT: Joi.number().port().required(),
    API_HOST: Joi.string().hostname().required()
}
