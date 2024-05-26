/**
 * Checks if a user has the required functions for authorization.
 *
 * @param {Array} userFunctions - The functions assigned to the user.
 * @param {Array} allowedFunctions - The functions required for authorization.
 * @returns {boolean} - True if the user has the one of the required functions, false otherwise.
 */
export const employeeFunctionAuth = (userFunctions, allowedFunctions) => {
    const functions = userFunctions.map(userFunction => userFunction.title)
    const hasFunctions = allowedFunctions.some(allowedFunction => functions.includes(allowedFunction));
    return hasFunctions;
}