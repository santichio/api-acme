/**
 * Response base object
 * @var message user display friendly message
 * @var statusCode HTTP status code
 * @var data response data object
 * @var timeStamp date string when it instantiate
 * @var ref reference code of response / error
 * @var error error description
 */
interface IResponseBase {
    message: string
    statusCode: number
    timeStamp: string
}

export interface IResponse<T> extends IResponseBase {
    metaData?: IMetaData
    data?: T
}

export interface IResponseError extends IResponseBase {
    errorRef?: string
    error?: string
    reqUrl?: string
    reqMethod?: string
    reqHost?: string
}

export interface IMetaData {
    page?: number
    limit?: number
    offset?: number
    total?: number
}
