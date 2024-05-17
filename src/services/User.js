import User from '../models/User.js';

export const getAllUsers = async () => {
    // Get all users
    const users = await User.query();

    if (!users) {
        throw new Error('No users found');
    }

    return users;
}  

export const getUserById = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the user by id
    const user = User.query().findById(id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

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

    if (existingUser) {
        throw new Error('User already exists');
    }
    
    // Create a new user
    const newUser = User.query().insert(user);

    return newUser;
}

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

