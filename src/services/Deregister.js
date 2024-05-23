import Deregister from "../models/Deregister";


/**
 * Retrieves all deregisters from the database.
 * @param {string} withGraphFetched - The graph to fetch along with the deregisters.
 * @returns {Promise<Array>} - A promise that resolves to an array of deregisters.
 * @throws {Error} - If no deregisters are found.
 */
export const getAllDeregisters = async (withGraphFetched = '[]') => {

    // Get all deregisters
    const deregisters = await Deregister.query().withGraphFetched(withGraphFetched);

    // Check if deregisters are found
    if (!deregisters) {
        throw new Error('No deregisters found');
    }

    return deregisters;

}


/**
 * Retrieves a deregister object by its ID.
 * @param {number} id - The ID of the deregister object to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the deregister object.
 * @returns {Promise<Object>} - A promise that resolves to the deregister object.
 * @throws {Error} - If the ID is not provided or if the deregister object is not found.
 */
export const getDeregisterById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the deregister by id
    const deregister = await Deregister.query().findById(id).withGraphFetched(withGraphFetched);

    if (!deregister) {
        throw new Error('Deregister not found');
    }

    return deregister;

}


/**
 * Creates a deregister record.
 * @param {Object} deregister - The deregister object.
 * @param {string} deregister.reason - The reason for deregistering.
 * @param {string} deregister.deregisters_date - The date of deregistration.
 * @param {string} deregister.student_id - The ID of the student.
 * @returns {Promise<Object>} - The created deregister record.
 * @throws {Error} - If deregister is not provided or if it is missing required fields.
 */
export const createDeregister = async (deregister) => {

    // Check if deregister is provided
    if (!deregister) {
        throw new Error('Deregister is required');
    }

    // Check if deregister has all required fields
    if (!deregister.reason || !deregister.deregisters_date || !deregister.student_id) {
        throw new Error('Deregister is missing required fields');
    }

    // Create the deregister
    const createdDeregister = await Deregister.query().insert(deregister);

    return createdDeregister;

}


/**
 * Updates a deregister record in the database.
 * @param {number} id - The ID of the deregister record to update.
 * @param {object} deregister - The updated deregister object.
 * @returns {Promise<object>} - The updated deregister object.
 * @throws {Error} - If id or deregister is not provided, or if the deregister record is not found.
 */
export const updateDeregister = async (id, deregister) => {

    // Check if id is provided
    if (!id || !deregister) {
        throw new Error('Id and deregister are required');
    }

    // Check if deregister exists
    const existingDeregister = await Deregister.query().findById(id);

    if (!existingDeregister) {
        throw new Error('Deregister not found');
    }

    // Update the deregister
    const updatedDeregister = await Deregister.query().findById(id).patch(deregister);

    return updatedDeregister;

}


/**
 * Deletes a deregister record by its ID.
 * 
 * @param {number} id - The ID of the deregister record to delete.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted deregister records.
 * @throws {Error} - If the ID is not provided or if the deregister record is not found.
 */
export const deleteDeregister = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if deregister exists
    const existingDeregister = await Deregister.query().findById(id);

    if (!existingDeregister) {
        throw new Error('Deregister not found');
    }

    // Delete the deregister
    const deletedDeregister = await Deregister.query().deleteById(id);

    return deletedDeregister;

}