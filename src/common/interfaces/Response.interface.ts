/**
 * Response base object
 * @var message user display friendly message
 * @var statusCode HTTP status code
 * @var data response data object
 * @var timeStamp date string when it instantiate
 * @var ref reference code of response / error
 * @var error error description
 */
export interface ResponseInterface {
    message: string
    statusCode: number
    data?: any
    timeStamp: string
    errorRef?: string
    error?: unknown
}
