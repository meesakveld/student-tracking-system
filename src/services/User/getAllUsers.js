import User from '../../models/User.js';

export const getAllUsers = async () => {
    const users = await User.query();
    return users;
}  

export const getUserById = (id) => {

}

export const createUser = (user) => {

}

export const updateUser = (id, user) => {

}

export const deleteUser = (id) => {

}

