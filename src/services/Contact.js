import Contact from "../models/Contact";


/**
 * Retrieves all contacts with optional graph fetching.
 * @param {string} withGraphFetched - The graph to fetch along with the contacts. Default is an empty array.
 * @returns {Promise<Array>} - A promise that resolves to an array of contacts.
 * @throws {Error} - If no contacts are found.
 */
export const getAllContacts = async (withGraphFetched = '[]') => {

    // Get all contacts
    const contacts = await Contact.query().withGraphFetched(withGraphFetched);

    // Check if contacts are found
    if (!contacts) {
        throw new Error('No contacts found');
    }

    return contacts;

}


/**
 * Retrieves a contact by its ID.
 *
 * @param {number} id - The ID of the contact to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the contact.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved contact.
 * @throws {Error} - If the ID is not provided or if the contact is not found.
 */
export const getContactById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the contact by id
    const contact = await Contact.query().findById(id).withGraphFetched(withGraphFetched);

    if (!contact) {
        throw new Error('Contact not found');
    }

    return contact;

}


/**
 * Creates a new contact.
 * @param {Object} contact - The contact object to be created.
 * @param {string} contact.user_id - The user ID of the contact.
 * @returns {Promise<Object>} - A promise that resolves to the created contact object.
 * @throws {Error} - If the contact is not provided, is missing required fields, or already exists.
 */
export const createContact = async (contact) => {

    // Check if contact is provided
    if (!contact) {
        throw new Error('Contact is required');
    }

    // Check if contact has all required fields
    if (!contact.user_id) {
        throw new Error('Contact is missing required fields');
    }

    // Check if the contact already exists
    const existingContact = await Contact.query().findOne({ user_id: contact.user_id });

    if (existingContact) {
        throw new Error('Contact already exists');
    }

    return await Contact.query().insertGraph(contact);
}


/**
 * Updates a contact with the provided id.
 * @param {number} id - The id of the contact to update.
 * @param {object} contact - The updated contact object.
 * @returns {Promise<object>} - The updated contact object.
 * @throws {Error} - If id or contact is not provided, or if the contact already exists.
 */
export const updateContact = async (id, contact) => {

    // Check if id is provided
    if (!id || !contact) {
        throw new Error('Id and contact are required');
    }

    // Check if contact exists
    const existingContact = await Contact.query().findById(id);

    if (!existingContact) {
        throw new Error('Contact not found');
    }

    // Update the contact
    const contact = await Contact.query().upsertGraph(contact);

    return contact;
}


/**
 * Deletes a contact by its ID.
 * @param {number} id - The ID of the contact to delete.
 * @returns {Promise<Object>} - A promise that resolves to the deleted contact.
 * @throws {Error} - If the ID is not provided or if the contact is not found.
 */
export const deleteContact = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if contact exists
    const existingContact = await Contact.query().findById(id);

    if (!existingContact) {
        throw new Error('Contact not found');
    }

    // Delete the contact
    const deletedContact = await Contact.query().deleteById(id);

    return deletedContact;
}