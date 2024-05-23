import Role from "../../models/Role";

/**
 * Retrieves all roles.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the roles.
 * @returns {Promise<Array>} - A promise that resolves to an array of roles.
 * @throws {Error} - If no roles are found.
 */
export const getAllRole = async (withGraphFetched = '[]') => {

    // Get all roles
    const roles = await Role.query().withGraphFetched(withGraphFetched);

    // Check if roles are found
    if (!roles) {
        throw new Error('No roles found');
    }

    return roles;

};


/**
 * Retrieves a role by its ID.
 * @param {number} id - The ID of the role to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the role.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved role.
 * @throws {Error} - If the ID is not provided or if the role is not found.
 */
export const getRoleById = async (id, withGraphFetched = '[]') => {

    // check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // check the role by id
    const role = await Role.query().findById(id).withGraphFetched(withGraphFetched);

    // check if role is found
    if (!role) {
        throw new Error('Role not found');
    }

    return role;

};


/**
 * Creates a new role.
 * @param {Object} role - The role object to be created.
 * @param {string} role.title - The title of the role.
 * @returns {Promise<Object>} - A promise that resolves to the newly created role object.
 * @throws {Error} - If the role is not provided or if it is missing required fields.
 */
export const createRole = async (role) => {

    // check if role is provided
    if (!role) {
        throw new Error('Role is required');
    }

    // check if role is missing required fields
    if (!role.title) {
        throw new Error('Role is missing required fields');
    }

    // create a new role
    const newRole = await Role.query().insert(role);

    return newRole;

}


/**
 * Updates a role by its ID.
 * @param {number} id - The ID of the role to update.
 * @param {object} role - The updated role object.
 * @returns {Promise<object>} - A promise that resolves to the updated role object.
 * @throws {Error} - If the ID or role is not provided, or if the role is not found.
 */
export const updateRole = async (id, role) => {
    
        // check if role is provided
        if (!id || !role) {
            throw new Error('Role is required');
        }
    
        const existingRole = await Role.query().findById(id);

        // check if role is found
        if (!existingRole) {
            throw new Error('Role not found');
        }
    
        // update the role
        const updatedRole = await Role.query().patchAndFetchById(id, role);
    
        return updatedRole;

};


/**
 * Deletes a role by its ID.
 * @param {number} id - The ID of the role to delete.
 * @returns {Promise<number>} - A promise that resolves to the ID of the deleted role.
 * @throws {Error} - If the ID is not provided or if the role is not found.
 */

export const deleteRole = async (id) => {

    // check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    const existingRole = await Role.query().findById(id);

    if (!existingRole) {
        throw new Error('Role not found');
    }

    // delete the role
    const deletedRole = await Role.query().deleteById(id);

    return deletedRole;

};