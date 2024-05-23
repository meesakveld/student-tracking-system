import Label from "../models/Label";


/**
 * Retrieves all labels from the database.
 * @param {string} withGraphFetched - The graph to fetch along with the labels. Default is '[]'.
 * @returns {Promise<Array>} - A promise that resolves to an array of labels.
 * @throws {Error} - If no labels are found.
 */
export const getAllLabels = async (withGraphFetched = '[]') => {

    // Get all labels
    const labels = await Label.query().withGraphFetched(withGraphFetched);

    // Check if labels are found
    if (!labels) {
        throw new Error('No labels found');
    }

    return labels;
}


/**
 * Retrieves a label by its ID.
 * @param {number} id - The ID of the label to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the label.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved label.
 * @throws {Error} - If the ID is not provided or if the label is not found.
 */
export const getLabelById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the label by id
    const label = await Label.query().findById(id).withGraphFetched(withGraphFetched);

    if (!label) {
        throw new Error('Label not found');
    }

    return label;

}


/**
 * Creates a new label.
 * @param {Object} label - The label object to be created.
 * @param {string} label.title - The title of the label.
 * @returns {Promise<Object>} - A promise that resolves to the newly created label object.
 * @throws {Error} - If the label is not provided, or if it is missing required fields, or if the label already exists.
 */
export const createLabel = async (label) => {

    // Check if label is provided
    if (!label) {
        throw new Error('Label is required');
    }

    // Check if label has all required fields
    if (!label.title) {
        throw new Error('Label is missing required fields');
    }

    // Check if the label already exists
    const existingLabel = await Label.query().findOne({ title: label.title });

    if (existingLabel) {
        throw new Error('Label already exists');
    }

    // Create the label
    const newLabel = await Label.query().insert(label);

    return newLabel;
}


/**
 * Updates a label with the specified id.
 * @param {number} id - The id of the label to update.
 * @param {object} label - The updated label object.
 * @returns {Promise<object>} - A promise that resolves to the updated label object.
 * @throws {Error} - If id or label is missing.
 * @throws {Error} - If the label with the specified id is not found.
 */
export const updateLabel = async (id, label) => {

    if (!id || !label) {
        throw new Error('Id and label are required');
    }

    // Check if label exists
    const existingLabel = await Label.query().findById(id);

    if (!existingLabel) {
        throw new Error('Label not found');
    }

    // Update the label
    const updatedLabel = await Label.query().patchAndFetchById(id, label);

    return updatedLabel;
}


/**
 * Deletes a label by its ID.
 * @param {number} id - The ID of the label to delete.
 * @returns {Promise<object>} - A promise that resolves to the deleted label.
 * @throws {Error} - If the ID is not provided or if the label is not found.
 */
export const deleteLabel = async (id) => {

    if (!id) {
        throw new Error('Id is required');
    }

    // Check if label exists
    const existingLabel = await Label.query().findById(id);

    if (!existingLabel) {
        throw new Error('Label not found');
    }

    // Delete the label
    const deletedLabel = await Label.query().deleteById(id);

    return deletedLabel;
}