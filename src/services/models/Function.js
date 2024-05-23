import e from 'express';
import Function from '../../models/Function';

/**
 * Retrieves all functions with optional graph fetching.
 *
 * @param {string} withGraphFetched - The graph to be fetched (default: '[]').
 * @returns {Promise<Array>} - A promise that resolves to an array of functions.
 * @throws {Error} - If no functions are found.
 */
export const getAllfunction = async (withGraphFetched = '[]') => {
    // Get all functions
    const functions = await Function.query().withGraphFetched(withGraphFetched);

    // Check if functions are found
    if (!functions) {
        throw new Error('No functions found');
    }

    return functions;

};


/**
 * Retrieves a function by its ID.
 * @param {string} id - The ID of the function to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the function.
 * @returns {Promise<Object>} - A promise that resolves to the function object.
 * @throws {Error} - If the ID is not provided or if the function is not found.
 */
export const getFunctionById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the function by id
    const functionItem = await Function.query().findById(id).withGraphFetched(withGraphFetched);

    // Check if function is found
    if (!functionItem) {
        throw new Error('Function not found');
    }

    return functionItem;

};


/**
 * Creates a new function.
 * @param {Object} functionItem - The function item to be created.
 * @param {string} functionItem.student_id - The ID of the student.
 * @param {string} functionItem.course_id - The ID of the course.
 * @param {string} functionItem.mentor_id - The ID of the mentor.
 * @returns {Promise<Object>} - A promise that resolves to the newly created function.
 * @throws {Error} - If the function item is not provided or if it is missing required fields.
 */
export const createFunction = async (functionItem) => {

    // Check if function is provided
    if (!functionItem) {
        throw new Error('Function is required');
    }

    // Check if function is missing required fields
    if (!functionItem.student_id || !functionItem.course_id || !functionItem.mentor_id) {
        throw new Error('Function name is required');
    }

    // Create the function
    const newFunction = await Function.query().insert(functionItem);

    return newFunction;
};


/**
 * Updates a function item in the database.
 * @param {number} id - The ID of the function item to update.
 * @param {object} functionItem - The updated function item object.
 * @returns {Promise<object>} - A promise that resolves to the updated function item.
 * @throws {Error} - If id or functionItem is not provided, or if the function item is not found.
 */
export const updateFunction = async (id, functionItem) => {

    // Check if id is provided
    if (!id || !functionItem) {
        throw new Error('Id and function are required');
    }

    // Check if function exists
    const existingFunction = await Function.query().findById(id);

    if (!existingFunction) {
        throw new Error('Function not found');
    }

    // Update the function
    const updatedFunction = await Function.query().findById(id).patch(functionItem);

    return updatedFunction;

};

/**
 * Deletes a function by its ID.
 * @param {number} id - The ID of the function to delete.
 * @returns {Promise<number>} - A promise that resolves to the ID of the deleted function.
 * @throws {Error} - If the ID is not provided, or if the function is not found.
 */
export const deleteFunction = async (id) => {
    
        // Check if id is provided
        if (!id) {
            throw new Error('Id is required');
        }
    
        // Check if function exists
        const existingFunction = await Function.query().findById(id);

        if (!existingFunction) {
            throw new Error('Function not found');
        }   

        // Delete the function
        const deletedFunction = await Function.query().deleteById(id);

        return deletedFunction;

};