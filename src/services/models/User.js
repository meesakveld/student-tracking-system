import User from '../../models/User.js';


/**
 * Retrieves all users with optional graph fetching.
 * @param {string} withGraphFetched - The graph to fetch along with the users. Default is an empty array.
 * @returns {Promise<Array>} - A promise that resolves to an array of users.
 * @throws {Error} - If no users are found.
 */
export const getAllUsers = async (withGraphFetched = '[]') => {
    // Get all users
    const users = await User.query().withGraphFetched(withGraphFetched);

    if (!users) {
        throw new Error('No users found');
    }

    return users;
}  


/**
 * Retrieves a user by their ID.
 * @param {number} id - The ID of the user to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the user.
 * @returns {Promise<Object>} - A promise that resolves to the user object.
 * @throws {Error} - If the ID is not provided or if the user is not found.
 */
export const getUserById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the user by id
    const user = await User.query().findById(id).withGraphFetched(withGraphFetched);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

/**
 * Creates a new user.
 * @param {Object} user - The user object containing user details.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} user.firstName - The first name of the user.
 * @param {string} user.lastName - The last name of the user.
 * @param {string} user.role - The role of the user.
 * @param {string} user.username - The username of the user.
 * @returns {Promise<Object>} - A promise that resolves to the newly created user object.
 * @throws {Error} - If the user is not provided, or if the user is missing required fields, or if the user already exists.
 */
export const createUser = async (user) => {

    // Check if user is provided
    if (!user) {
        throw new Error('User is required');
    }

    // Check if user has all required fields
    if (!user.email || !user.password || !user.firstName || !user.lastName || !user.role || !user.username) {
        throw new Error('User is missing required fields');
    }

    // Check if the user already exists
    const existingUser = User.query().findOne({ email: user.email });
    const existingUsername = User.query().findOne({ username: user.username });

    if (existingUser || existingUsername) {
        throw new Error('User already exists');
    }
    
    // Create a new user
    const newUser = User.query().insert(user);

    return newUser;
}

/**
 * Updates a user with the provided id.
 * @param {number} id - The id of the user to update.
 * @param {object} user - The updated user object.
 * @returns {Promise<object>} - A promise that resolves to the updated user object.
 * @throws {Error} - If id or user is not provided, or if the user is not found.
 */
export const updateUser = async (id, user) => {

    // Check if id and user are provided
    if (!id || !user) {
        throw new Error('Id and user are required');
    }

    // Check if the user exists
    const existingUser = User.query().findById(id);

    if (!existingUser) {
        throw new Error('User not found');
    }

    // Update the user
    const updatedUser = User.query().findById(id).patch(user);

    return updatedUser;
}


/**
 * Deletes a user by their ID.
 *
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<number>} - A promise that resolves to the ID of the deleted user.
 * @throws {Error} - If the ID is not provided or if the user is not found.
 */
export const deleteUser = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if the user exists
    const existingUser = User.query().findById(id);

    if (!existingUser) {
        throw new Error('User not found');
    }

    // Delete the user
    const deletedUser = User.query().deleteById(id);

    return deletedUser;
}

