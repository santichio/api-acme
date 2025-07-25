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

export interface IResponse extends IResponseBase {
    metadata?: IMetadata
    data?: object | []
}

export type IPreResponse = Pick<IResponse, 'message' | 'data' | 'metadata'>

export interface IResponseError extends IResponseBase {
    errorLog: string
    error?: string | object
    reqUrl?: string
    reqMethod?: string
    reqHost?: string
}

export interface IMetadata {
    pagination?: IPagination
    info?: string
    extra?: object
    query?: object
}

export interface IPagination {
    page?: number
    count?: number
    limit?: number
    offset?: number
    total?: number
}
