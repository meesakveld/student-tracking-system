import Attendance from "../../models/Attendance.js"

/**
 * Retrieves all attendances with optional graph fetching.
 * @param {string} withGraphFetched - The graph to be fetched (optional, default is '[]').
 * @returns {Promise<Array>} - A promise that resolves to an array of attendances.
 * @throws {Error} - If no attendances are found.
 */
export const getAllAttendence = async (withGraphFetched = '[]') => {

    // Get all attendances
    const attendances = await Attendance.query().withGraphFetched(withGraphFetched);

    // Check if attendances are found
    if (!attendances) {
        throw new Error('No attendances found');
    }

    return attendances;

}


/**
 * Retrieves the attendance record by its ID.
 * @param {number} id - The ID of the attendance record.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the attendance record.
 * @returns {Promise<Object>} - The attendance record.
 * @throws {Error} - If the ID is not provided or if the attendance record is not found.
 */
export const getAttendenceById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the attendence by id
    const attendence = await Attendance.query().findById(id).withGraphFetched(withGraphFetched);

    // Check if attendence is found
    if (!attendence) {
        throw new Error('Attendence not found');
    }

    return attendence;

}


/**
 * Creates a new attendance record.
 * @param {Object} attendance - The attendance object to be created.
 * @param {string} attendance.student_id - The ID of the student.
 * @param {string} attendance.course_id - The ID of the course.
 * @param {string} attendance.date - The date of the attendance.
 * @param {string} attendance.attendances_type_id - The ID of the attendance type.
 * @returns {Promise<Object>} - A promise that resolves to the newly created attendance object.
 * @throws {Error} - If attendance is not provided or if it is missing required fields.
 */
export const createAttendence = async (attendence) => {

    // Check if attendence is provided
    if (!attendence) {
        throw new Error('Attendence is required');
    }

    // Check if attendence has all required fields
    if (!attendence.student_id || !attendence.course_id || !attendence.date || !attendence.attendances_type_id) {
        throw new Error('Attendence is missing required fields');
    }

    // Create a new attendence
    const newAttendence = await Attendance.query().insert(attendence);

    return newAttendence;

}


/**
 * Updates the attendance record with the provided id.
 * @param {number} id - The id of the attendance record to update.
 * @param {object} attendance - The updated attendance data.
 * @returns {Promise<object>} - A promise that resolves to the updated attendance record.
 * @throws {Error} - If id or attendance is not provided, or if the attendance record is not found.
 */
export const updateAttendence = async (id, attendence) => {

    // Check if id and attendence are provided
    if (!id || !attendence) {
        throw new Error('Id and attendence are required');
    }

    // Check if attendence exists
    const existingAttendence = await Attendance.query().findById(id);

    if (!existingAttendence) {
        throw new Error('Attendence not found');
    }

    // Update the attendence
    const updatedAttendence = await Attendance.query().findById(id).patch(attendence);

    return updatedAttendence;

}


/**
 * Deletes an attendance record by its ID.
 * @param {number} id - The ID of the attendance record to delete.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted attendance records.
 * @throws {Error} - If the ID is not provided or if the attendance record is not found.
 */
export const deleteAttendence = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if the attendence exists
    const existingAttendence = await Attendance.query().findById(id);

    if (!existingAttendence) {
        throw new Error('Attendence not found');
    }

    // Delete the attendence
    const deletedAttendence = await Attendance.query().deleteById(id);

    return deletedAttendence;

}