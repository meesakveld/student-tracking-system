import WorkplaceCoach from "../models/WorkplaceCoach";

/**
 * Retrieves all workplace coaches.
 * @param {string} withGraphFetched - The graph to fetch along with the workplace coaches. Default is '[]'.
 * @returns {Promise<Array>} - A promise that resolves to an array of workplace coaches.
 * @throws {Error} - If no workplace coaches are found.
 */
export const getAllWorkplaceCoache = async (withGraphFetched = '[]') => {

    // Get all workplace coaches
    const workplaceCoaches = await WorkplaceCoach.query().withGraphFetched(withGraphFetched);

    // Check if workplace coaches are found
    if (!workplaceCoaches) {
        throw new Error('No workplace coaches found');
    }

    return workplaceCoaches;

};


/**
 * Retrieves a workplace coach by ID.
 * @param {number} id - The ID of the workplace coach.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the workplace coach.
 * @returns {Promise<Object>} - A promise that resolves to the workplace coach object.
 * @throws {Error} - If the ID is not provided or if the workplace coach is not found.
 */
export const getWorkplaceCoachById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the workplace coach by id
    const workplaceCoach = await WorkplaceCoach.query().findById(id).withGraphFetched(withGraphFetched);

    // Check if workplace coach is found
    if (!workplaceCoach) {
        throw new Error('Workplace coach not found');
    }

    return workplaceCoach;

};


/**
 * Creates a new workplace coach.
 * @param {string} id - The ID of the workplace coach.
 * @param {object} workplaceCoach - The workplace coach object.
 * @param {string} workplaceCoach.title - The title of the workplace coach.
 * @returns {Promise<object>} - A promise that resolves to the newly created workplace coach object.
 * @throws {Error} - If the ID or workplace coach is not provided, or if the title is missing.
 */
export const createWorkplaceCoach = async (id, workplaceCoach) => {

    // Check if workplace coach is provided
    if (!id || !workplaceCoach) {
        throw new Error('Workplace coach is required');
    }

    // check if workplace coach has all required fields
    if (!workplaceCoach.title) {
        throw new Error('Title is required');
    }

    //create a new workplace coach
    const newWorkplaceCoach = await WorkplaceCoach.query().insert(workplaceCoach);

    return newWorkplaceCoach;

};


/**
 * Updates a workplace coach by ID.
 *
 * @param {number} id - The ID of the workplace coach to update.
 * @param {object} workplaceCoach - The updated workplace coach object.
 * @returns {Promise<object>} - A promise that resolves to the updated workplace coach object.
 * @throws {Error} - If the ID or workplace coach is not provided, or if the workplace coach is not found.
 */
export const updateWorkplaceCoach = async (id, workplaceCoach) => {

    // Check if id and attendence are provided
    if (!id || !workplaceCoach) {
        throw new Error('Id and workplace coach are required');
    }

    // Check if attendence exists
    const existingWorkPlaceCoach = await WorkplaceCoach.query().findById(id);

    if (!existingWorkPlaceCoach) {
        throw new Error('Workplace coach not found');
    }

    // Update the workplace coach
    const updatedWorkplaceCoach = await WorkplaceCoach.query().findById(id).patch(workplaceCoach);

    return updatedWorkplaceCoach;

};


/**
 * Deletes a workplace coach by its ID.
 * @param {number} id - The ID of the workplace coach to delete.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted workplace coaches.
 * @throws {Error} - If the ID is not provided or if the workplace coach is not found.
 */
export const deleteWorkplaceCoach = async (id) => {

    // check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // check if workplace coach exists
    const existingWorkplaceCoach = await WorkplaceCoach.query().findById(id);

    if (!existingWorkplaceCoach) {
        throw new Error('Workplace coach not found');
    }

    // Delete the workplace coach
    const deletedWorkplaceCoach = await WorkplaceCoach.query().deleteById(id);

    return deletedWorkplaceCoach;

};