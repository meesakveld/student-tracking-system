import StatusRegistration from "../models/StatusesRegistration";

/**
 * Retrieves all status registrations.
 *
 * @param {string} withGraphFetched - The graph to fetch along with the status registrations. Default is '[]'.
 * @returns {Promise<Array>} - A promise that resolves to an array of status registrations.
 * @throws {Error} - If no status registrations are found.
 */
export const getAllSatusRegistrations = async (withGraphFetched = '[]') => {

    // Get all status registrations
    const statusRegistrations = await StatusRegistration.query().withGraphFetched(withGraphFetched);

    // Check if status registrations are found
    if (!statusRegistrations) {
        throw new Error('No status registrations found');
    }

    return statusRegistrations;

}


/**
 * Retrieves the status registration by its ID.
 * @param {number} id - The ID of the status registration.
 * @param {string} [withGraphFetched='[]'] - The optional graph to fetch along with the status registration.
 * @returns {Promise<Object>} - A promise that resolves to the status registration object.
 * @throws {Error} - If the ID is not provided or if the status registration is not found.
 */
export const getStatusRegistrationById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the status registration by id
    const statusRegistration = await StatusRegistration.query().findById(id).withGraphFetched(withGraphFetched);

    // Check if status registration is found
    if (!statusRegistration) {
        throw new Error('Status registration not found');
    }

    return statusRegistration;

};


/**
 * Creates a new status registration.
 * @param {Object} statusRegistration - The status registration object to be created.
 * @param {string} statusRegistration.student_id - The ID of the student.
 * @param {string} statusRegistration.status_id - The ID of the status.
 * @returns {Promise<Object>} - A promise that resolves to the newly created status registration object.
 * @throws {Error} - If the status registration object is not provided, or if the required fields are missing.
 */
export const createStatusRegistration = async (statusRegistration) => {

    // Check if status registration is provided
    if (!statusRegistration) {
        throw new Error('Status registration is required');
    }

    // Check if required fields are provided
    if (!statusRegistration.student_id || !statusRegistration.status_id) {
        throw new Error('Student ID and Status ID are required');
    }

    // Create the status registration
    const newStatusRegistration = await StatusRegistration.query().insert(statusRegistration);

    return newStatusRegistration;

};


/**
 * Updates the status registration with the provided id.
 * @param {number} id - The id of the status registration to update.
 * @param {Object} statusRegistration - The updated status registration object.
 * @param {number} statusRegistration.student_id - The id of the student.
 * @param {number} statusRegistration.status_id - The id of the status.
 * @returns {Promise<Object>} - A promise that resolves to the updated status registration object.
 * @throws {Error} - If id is not provided, status registration is not provided, or required fields are missing.
 */
export const updateStatusRegistration = async (id, statusRegistration) => {

    // Check if id is provided
    if (!id || !statusRegistration) {
        throw new Error('Id and status registration are required');
    }

    // Check if status registration has required fields
    if (!statusRegistration.student_id || !statusRegistration.status_id) {
        throw new Error('Student ID and Status ID are required');
    }

    // Update the status registration
    const updatedStatusRegistration = await StatusRegistration.query().findById(id).patch(statusRegistration);

    return updatedStatusRegistration;

};


/**
 * Deletes a status registration by its ID.
 * @param {number} id - The ID of the status registration to delete.
 * @returns {Promise<Object>} - A promise that resolves to the deleted status registration object.
 * @throws {Error} - If the ID is not provided or if the status registration is not found.
 */
export const deleteStatusRegistration = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if status registration exists
    const existingStatusRegistration = await StatusRegistration.query().findById(id);

    // Check if status registration is found
    if (!existingStatusRegistration) {
        throw new Error('Status registration not found');
    }

    // Delete the status registration
    await StatusRegistration.query().deleteById(id);

    return existingStatusRegistration;

};