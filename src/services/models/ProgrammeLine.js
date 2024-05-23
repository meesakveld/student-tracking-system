import ProgrammeLine from "../../models/ProgrammeLine";

/**
 * Retrieves all programme lines with optional graph fetching.
 * @param {string} [withGraphFetched='[]'] - The graph to be fetched along with the programme lines.
 * @returns {Promise<Array>} - A promise that resolves to an array of programme lines.
 * @throws {Error} - If no programme lines are found.
 */
export const getAllProgrammeLines = async (withGraphFetched = '[]') => {

    // Get all programme lines
    const programmeLines = await ProgrammeLine.query().withGraphFetched(withGraphFetched);

    // Check if programme lines are found
    if (!programmeLines) {
        throw new Error('No programme lines found');
    }

    return programmeLines;

};

/**
 * Retrieves a programme line by its ID.
 * @param {number} id - The ID of the programme line.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the programme line.
 * @returns {Promise<Object>} - A promise that resolves to the programme line object.
 * @throws {Error} - If the ID is not provided or if the programme line is not found.
 */
export const getProgrammeLineById = async (id, withGraphFetched = '[]') => {
    
        // Check if id is provided
        if (!id) {
            throw new Error('Id is required');
        }
    
        // Get the programme line by id
        const programmeLine = await ProgrammeLine.query().findById(id).withGraphFetched(withGraphFetched);
    
        // Check if programme line is found
        if (!programmeLine) {
            throw new Error('Programme line not found');
        }
    
        return programmeLine;
        
};


/**
 * Creates a new programme line.
 * @param {Object} programmeLine - The programme line object to be created.
 * @param {string} programmeLine.name - The name of the programme line.
 * @param {string} programmeLine.slug - The slug of the programme line.
 * @param {string} programmeLine.education_programme_id - The ID of the education programme associated with the programme line.
 * @returns {Promise<Object>} - A promise that resolves to the newly created programme line object.
 * @throws {Error} - If the programme line is not provided or if it is missing required fields.
 */
export const createProgrammeLine = async (programmeLine) => {

    // Check if programme line is provided
    if (!programmeLine) {
        throw new Error('Programme line is required');
    }

    // Check if programme line is missing required fields
    if (!programmeLine.name || !programmeLine.slug || !programmeLine.education_programme_id) {
        throw new Error('Programme line is missing required fields');
    }

    // Create the programme line
    const newProgrammeLine = await ProgrammeLine.query().insert(programmeLine);

    return newProgrammeLine;

};


/**
 * Updates a programme line with the provided id.
 * @param {number} id - The id of the programme line to update.
 * @param {object} programmeLine - The updated programme line object.
 * @returns {Promise<object>} - A promise that resolves to the updated programme line object.
 * @throws {Error} - If id or programme line is not provided, or if the programme line is not found.
 */
export const updateProgrammeLine = async (id, programmeLine) => {

    // check if id and programme line are provided
    if (!id || !programmeLine) {
        throw new Error('Id and programme line are required');
    }

    //check if programmeline exists
    const existingProgrammeLine = await ProgrammeLine.query().findById(id);

    if (!existingProgrammeLine) {
        throw new Error('Programme line not found');
    }

    // update the programme line
    const updatedProgrammeLine = await ProgrammeLine.query().findById(id).patch(programmeLine);

    return updatedProgrammeLine;

};


/**
 * Deletes a programme line by its ID.
 * @param {number} id - The ID of the programme line to be deleted.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted programme lines.
 * @throws {Error} - If the ID is not provided or if the programme line is not found.
 */
export const deletedProgrammeLine = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if programme line exists
    const existingProgrammeLine = await ProgrammeLine.query().findById(id);

    if (!existingProgrammeLine) {
        throw new Error('Programme line not found');
    }

    // Delete the programme line
    const deletedProgrammeLine = await ProgrammeLine.query().deleteById(id);

    return deletedProgrammeLine;

};