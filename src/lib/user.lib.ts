/**
 * Success string for response message
 * @param username The username of created user entity
 * @returns The response message string
 */
export const successMessage = (username) => ({
    USER_CREATED: `New user ${username} was created succesfully!`
})
