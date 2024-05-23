import Comment from '../models/Comment.js';

/**
 * Retrieves all comments with optional graph fetching.
 *
 * @param {string} withGraphFetched - The graph to fetch along with the comments. Defaults to '[]'.
 * @returns {Promise<Array>} - A promise that resolves to an array of comments.
 * @throws {Error} - If comments are not found.
 */
export const getAllComments = async (withGraphFetched = '[]') => {
    // get all comments
    const comments = await Comment.query().withGraphFetched(withGraphFetched);

    if (!comments) {
        throw new Error('Comments not found');
    }

    return comments;
}


/**
 * Retrieves a comment by its ID.
 * @param {number} id - The ID of the comment to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the comment.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved comment.
 * @throws {Error} - If the ID is not provided or if the comment is not found.
 */
export const getCommentById = async (id, withGraphFetched = '[]') => {

    // check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // get the comment by id
    const comment = await Comment.query().findById(id).withGraphFetched(withGraphFetched);

    if (!comment) {
        throw new Error('Comment not found');
    }

    return comment;
}


/**
 * Creates a new comment.
 * @param {Object} comment - The comment object to be created.
 * @param {string} comment.student_id - The ID of the student.
 * @param {string} comment.employee_id - The ID of the employee.
 * @param {string} comment.education_programme_id - The ID of the education programme.
 * @param {string} comment.comment - The comment text.
 * @returns {Promise<Object>} - A promise that resolves to the newly created comment.
 * @throws {Error} - If the comment object is not provided or if any required fields are missing.
 */
export const createComment = async (comment) => {

    // check if comment is provided
    if (!comment) {
        throw new Error('Comment is required');
    }

    // check if comment is missing required fields
    if (!comment.student_id || !comment.employee_id || !comment.education_programme_id || !comment.comment) {
        throw new Error('Student ID is required');
    }

    // create a new comment
    const newComment = await Comment.query().insert(comment);

    return newComment;

}


/**
 * Updates a comment with the provided id.
 * @param {number} id - The id of the comment to update.
 * @param {object} comment - The updated comment object.
 * @returns {Promise<object>} - A promise that resolves to the updated comment.
 * @throws {Error} - If id or comment is not provided, or if the comment is not found.
 */
export const updateComment = async (id, comment) => {

    // check if id and comment are provided
    if (!id || !comment) {
        throw new Error('Id is required');
    }

    // check if comment exists
    const existingComments = await Comment.query().findById(id);


    // check if comment is missing required fields
    if (!existingComments) {
        throw new Error('Comment not found');
    }

    // update the comment
    const updatedComment = await Comment.query().patchAndFetchById(id, comment);

    return updatedComment;
};


/**
 * Deletes a comment by its ID.
 * @param {number} id - The ID of the comment to be deleted.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted comments.
 * @throws {Error} - If the ID is not provided or if the comment is not found.
 */
export const deleteComment = async (id) => {
    // check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // check if comment exists  
    const existingComment = await Comment.query().findById(id);

    if (!existingComment) {
        throw new Error('Comment not found');
    }

    // delete the comment
    const deletedComment = await Comment.query().deleteById(id);

    return deletedComment;
}