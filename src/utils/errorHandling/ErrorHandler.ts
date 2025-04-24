import { ValidationError } from 'joi'

export class ErrorHandler {
    /**
     * Thow generic error message
     * @param content string content
     */
    static generic(content: string): Error {
        return new Error(this.wrapErrorMessage(content))
    }

    /**
     * Print a validation error message for .env file.
     * @param properties Joi validationError#details object
     * @returns a string with the error message
     */
    static envFileValidation(properties: ValidationError): Error {
        const list: string[] = []

        properties.details.map((i) => {
            list.push(`\n- ${i.message}`)
        })

        return new Error(
            this.wrapErrorMessage(
                `Check the following properties in .env file: ${list.toString()}`
            )
        )
    }

    private static wrapErrorMessage(content: string): string {
        return `\n\n> ERROR <\n\n${content}\n\n`
    }
}
