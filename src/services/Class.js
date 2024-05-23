import Class  from '../models/Class.js';


/**
 * Retrieves all classes with optional graph fetching.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the classes.
 * @returns {Promise<Array>} - A promise that resolves to an array of classes.
 * @throws {Error} - If no classes are found.
 */
export const getAllClasses = async (withGraphFetched = '[]') => {
    // get all classes
    const classes = await Class.query().withGraphFetched(withGraphFetched);

    if (!classes) {
        throw new Error('No classes found');
    }

    return classes;
}


/**
 * Retrieves a class by its ID.
 * @param {string} id - The ID of the class to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the class.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved class.
 * @throws {Error} - If the ID is not provided or if the class is not found.
 */
export const getClassById = async (id, withGraphFetched = '[]') => {

    if (!id) {
        throw new Error('Id is required');
    }

    // get the class by id
    const clas = await Class.query().findById(id).withGraphFetched(withGraphFetched);

    // check if class is found
    if (!clas) {
        throw new Error('Class not found');
    }

    return clas;
}


/**
 * Creates a new class.
 * @param {Object} clas - The class object to be created.
 * @param {string} clas.name - The name of the class.
 * @param {string} clas.education_programme_id - The ID of the education programme associated with the class.
 * @returns {Promise<Object>} - A promise that resolves to the newly created class object.
 * @throws {Error} - If the class object is not provided, or if it is missing required fields, or if the class already exists.
 */
export const createClass = async (clas) => {

    // check if class is provided
    if (!clas) {
        throw new Error('Class is required');
    }

    // check if class is missing required fields
    if (!clas.name || !clas.education_programme_id) {
        throw new Error('Class is missing required fields');
    }

    const existingClass = await Class.query().findOne({ name: clas.name });

    if (existingClass) {
        throw new Error('Class already exists');
    }

    // create the class
    const newClass = await Class.query().insert(clas);

    return newClass;
}

/**
 * Updates a class with the provided id.
 * @param {string} id - The id of the class to update.
 * @param {object} clas - The updated class object.
 * @returns {Promise<object>} - A promise that resolves to the updated class object.
 * @throws {Error} - If id is not provided or if the class is not found.
 */
export const updateClass = async (id, clas) => {

    // check if id and clas are provided
    if (!id || !clas) {
        throw new Error('Id and class is required');
    }

    // Check if the user exists
    const existingClass = Class.query().findById(id);

    if (!existingClass) {
        throw new Error('Class not found');
    }

    // Update the user
    const updatedClass = Class.query().findById(id).patch(user);

    return updatedClass;

}

/**
 * Deletes a class by its ID.
 * @param {string} id - The ID of the class to be deleted.
 * @returns {Promise} A promise that resolves to the deleted class.
 * @throws {Error} If the ID is not provided or if the class is not found.
 */
export const deleteClass = async (id) => {
    if (!id) {
        throw new Error('Id is required');
    }

    const existingClass = Class.query().findById(id);

    if (!existingClass) {
        throw new Error('Class not found');
    }

    const deletedClass = Class.query().deleteById(id);

    return deletedClass;
}