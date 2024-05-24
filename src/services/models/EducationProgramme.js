import EducationProgramme from "../../models/EducationProgramme.js";

/**
 * Retrieves all education programmes.
 * @param {string} withGraphFetched - The graph to fetch along with the education programmes. Default is '[]'.
 * @returns {Promise<Array>} A promise that resolves to an array of education programmes.
 * @throws {Error} If no education programmes are found.
 */
export const getAllEducationProgrammes = async (withGraphFetched = '[]') => {

    // get all education programmes
    const educationProgrammes = await EducationProgramme.query().withGraphFetched(withGraphFetched);

    // check if education programmes are found
    if (!educationProgrammes) {
        throw new Error('No education programmes found');
    }

    return educationProgrammes;
}


/**
 * Retrieves an education programme by its ID.
 * @param {number} id - The ID of the education programme.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the education programme.
 * @returns {Promise<Object>} - A promise that resolves to the education programme object.
 * @throws {Error} - If the ID is not provided or if the education programme is not found.
 */
export const getEducationProgrammeById = async (id, withGraphFetched = '[]') => {

    // check if id is provided
    if (!id){
        throw new Error('Id is required');
    }

    // get the education programme by id
    const educationProgramme = await EducationProgramme.query().findById(id).withGraphFetched(withGraphFetched);

    // check if education programme is found
    if (!educationProgramme) {
        throw new Error('Education programme not found');
    }

    return educationProgramme;

}


/**
 * Creates a new education programme.
 * @param {Object} educationProgramme - The education programme object to be created.
 * @param {string} educationProgramme.name - The name of the education programme.
 * @param {string} educationProgramme.description - The description of the education programme.
 * @returns {Promise<Object>} - A promise that resolves to the newly created education programme object.
 * @throws {Error} - If the education programme is not provided or if it is missing required fields.
 */
export const createEducationProgramme = async (educationProgramme) => {

    // check if education programme is provided
    if (!educationProgramme) {
        throw new Error('Education programme is required');
    }

    // check if education programme is missing required fields
    if (!educationProgramme.name || !educationProgramme.description) {
        throw new Error('Education programme is missing required fields');
    }

    // create the education programme
    const newEducationProgramme = await EducationProgramme.query().insert(educationProgramme);

    return newEducationProgramme;
}


/**
 * Updates an education programme by its ID.
 * 
 * @param {number} id - The ID of the education programme to update.
 * @param {object} educationProgramme - The updated education programme object.
 * @returns {Promise<object>} - A promise that resolves to the updated education programme object.
 * @throws {Error} - If the ID or education programme is not provided, or if the education programme is not found.
 */
export const updateEducationProgramme = async (id, educationProgramme) => {
    
        // check if id is provided
        if (!id || !educationProgramme) {
            throw new Error('Id and education programme are required');
        }
    
        // check if education programme exists
        const existingEducationProgramme = await EducationProgramme.query().findById(id);

        if (!existingEducationProgramme) {
            throw new Error('Education programme not found');
        }
    
        // update the education programme
        const updatedEducationProgramme = await EducationProgramme.query().findById(id).patch(educationProgramme);
    
        return updatedEducationProgramme;

};


/**
 * Deletes an education programme by its ID.
 * 
 * @param {number} id - The ID of the education programme to delete.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted education programmes.
 * @throws {Error} - If the ID is not provided or if the education programme is not found.
 */
export const deleteEducationProgramme = async (id) => {
        
        // check if id is provided
        if (!id) {
            throw new Error('Id is required');
        }
    
        // check if education programme exists
        const existingEducationProgramme = await EducationProgramme.query().findById(id);
    
        if (!existingEducationProgramme) {
            throw new Error('Education programme not found');
        }
    
        // delete the education programme
        const deletedEducationProgramme = await EducationProgramme.query().deleteById(id);
    
        return deletedEducationProgramme;
        
}