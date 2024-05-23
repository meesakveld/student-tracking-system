import WorkplaceMentor from "../../models/WorkplaceMentor";

/**
 * Retrieves all workplace mentors.
 * @param {string} withGraphFetched - The graph to fetch along with the workplace mentors. Defaults to '[]'.
 * @returns {Promise<Array>} A promise that resolves to an array of workplace mentors.
 * @throws {Error} If no workplace mentors are found.
 */
export const getAllWorkplaceMentor = async (withGraphFetched = '[]') => {

    // Get all workplace coaches
    const workplaceCoaches = await WorkplaceMentor.query().withGraphFetched(withGraphFetched);

    // Check if workplace coaches are found
    if (!workplaceCoaches) {
        throw new Error('No workplace coaches found');
    }

    return workplaceCoaches;

};


/**
 * Retrieves a workplace mentor by their ID.
 * @param {string} id - The ID of the workplace mentor.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the workplace mentor.
 * @returns {Promise<Object>} - A promise that resolves to the workplace mentor object.
 * @throws {Error} - If the ID is not provided or if the workplace mentor is not found.
 */
export const getWorkplaceMentorById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the workplace coach by id
    const workplaceCoach = await WorkplaceMentor.query().findById(id).withGraphFetched(withGraphFetched);

    // Check if workplace coach is found
    if (!workplaceCoach) {
        throw new Error('Workplace coach not found');
    }

    return workplaceCoach;

};


/**
 * Creates a new workplace mentor.
 * @param {string} id - The ID of the workplace mentor.
 * @param {object} workplaceMentor - The details of the workplace mentor.
 * @param {string} workplaceMentor.title - The title of the workplace mentor.
 * @returns {Promise<object>} - A promise that resolves to the newly created workplace mentor.
 * @throws {Error} - If the ID, workplace mentor, or required fields are missing.
 */
export const createWorkplaceMentor = async (id, workplaceMentor) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if workplace coach is provided
    if (!workplaceMentor) {
        throw new Error('Workplace coach is required');
    }

    // Check if workplace coach is missing required fields
    if (!workplaceMentor.title) {
        throw new Error('Title is required');
    }

    // Create the workplace coach
    const newWorkplaceMentor = await WorkplaceMentor.query().insert({
        id,
        title: workplaceMentor.title
    });

    return newWorkplaceMentor;

};


/**
 * Updates a workplace mentor with the provided id.
 * @param {number} id - The id of the workplace mentor to update.
 * @param {object} workplaceMentor - The updated workplace mentor object.
 * @param {string} workplaceMentor.title - The title of the workplace mentor.
 * @returns {Promise<object>} - The updated workplace mentor object.
 * @throws {Error} - If id or workplaceMentor is not provided, or if workplaceMentor.title is missing.
 */
export const updateWorkplaceMentor = async (id, workplaceMentor) => {
    
        // Check if id is provided
    if (!id || !workplaceMentor) {
            throw new Error('Id is required');
        }
    
        // Check if workplace coach is missing required fields
        if (!workplaceMentor.title) {
            throw new Error('Title is required');
        }
    
        // Update the workplace coach
        const updatedWorkplaceMentor = await WorkplaceMentor.query().findById(id).patch({
            title: workplaceMentor.title
        });
    
        return updatedWorkplaceMentor;

};


/**
 * Deletes a workplace mentor by ID.
 * @param {string} id - The ID of the workplace mentor to delete.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted workplace mentors.
 * @throws {Error} - If the ID is not provided or if the workplace mentor is not found.
 */
export const deleteWorkplaceMentor = async (id) => {
    
        // Check if id is provided
        if (!id) {
            throw new Error('Id is required');
        }
    
        // Check if the workplace coach exists
        const existingWorkplaceMentor = await WorkplaceMentor.query().findById(id);
    
        if (!existingWorkplaceMentor) {
            throw new Error('Workplace coach not found');
        }
    
        // Delete the workplace coach
        const deletedWorkplaceMentor = await WorkplaceMentor.query().deleteById(id);
    
        return deletedWorkplaceMentor;

};