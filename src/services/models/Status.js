import Status from "../../models/Status";

/**
 * Retrieves all statuses.
 *
 * @param {string} withGraphFetched - The graph to fetch along with the statuses. Defaults to '[]'.
 * @returns {Promise<Array>} - A promise that resolves to an array of statuses.
 * @throws {Error} - If no statuses are found.
 */
export const getAllStatus = async (withGraphFetched = '[]') => {

    // Get all statuses
    const statuses = await Status.query().withGraphFetched(withGraphFetched);

    // Check if statuses are found
    if (!statuses) {
        throw new Error('No statuses found');
    }

    return statuses;
};


/**
 * Retrieves the status by its ID.
 * @param {number} id - The ID of the status to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the status.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved status.
 * @throws {Error} - If the ID is not provided or if the status is not found.
 */
export const getStatusById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the status by id
    const status = await Status.query().findById(id).withGraphFetched(withGraphFetched);

    // Check if status is found
    if (!status) {
        throw new Error('Status not found');
    }

    return status;

};


/**
 * Creates a new status.
 * @param {Object} status - The status object to be created.
 * @param {string} status.title - The title of the status.
 * @returns {Promise<Object>} - A promise that resolves to the newly created status object.
 * @throws {Error} - If the status object is not provided or if the title is missing.
 */
export const createStatus = async (status) => {

    // Check if status is provided
    if (!status) {
        throw new Error('Status is required');
    }

    // Check if status has required fields
    if (!status.title) {
        throw new Error('Status title is required');
    }

    // Create the status
    const newStatus = await Status.query().insert(status);

    return newStatus;

};


/**
 * Updates the status of a record with the given id.
 * @param {number} id - The id of the record to update.
 * @param {object} status - The new status to set for the record.
 * @returns {Promise<object>} - A promise that resolves to the updated status object.
 * @throws {Error} - If id or status is not provided, or if the status is not found.
 */
export const updateStatus = async (id, status) => {

    // Check if status is provided
    if (!id || !status) {
        throw new Error('Id and status are required');
    }

    const existingStatus = await Status.query().findById(id);

    // Check if status is found
    if (!existingStatus) {
        throw new Error('Status not found');
    }

    // Update the status
    const updatedStatus = await existingStatus.query().findById(id).patch(status);

    return updatedStatus;

};


/**
 * Deletes a status by its ID.
 * @param {number} id - The ID of the status to delete.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted statuses.
 * @throws {Error} - If the ID is not provided or if the status is not found.
 */
export const deleteStatus = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if status exists
    const existingStatus = await Status.query().findById(id);

    if (!existingStatus) {
        throw new Error('Status not found');
    }

    // Delete the status
    const deletedStatus = await Status.query().deleteById(id);

    return deletedStatus;

};