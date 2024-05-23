import AttendanceType from "../models/AttendanceType";


/**
 * Retrieves all attendance types.
 * @param {string} withGraphFetched - The graph to fetch along with the attendance types. Default is '[]'.
 * @returns {Promise<Array>} - A promise that resolves to an array of attendance types.
 * @throws {Error} - If no attendance types are found.
*/
export const getAllAttendanceTypes = async (withGraphFetched = '[]') => {

    // Get all attendance types
    const attendanceTypes = await AttendanceType.query().withGraphFetched(withGraphFetched);

    // Check if attendance types are found
    if (!attendanceTypes) {
        throw new Error('No attendance types found');
    }

    return attendanceTypes;
}


/**
 * Retrieves an attendance type by its ID.
 * @param {number} id - The ID of the attendance type.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the attendance type.
 * @returns {Promise<Object>} - A promise that resolves to the attendance type object.
 * @throws {Error} - If the ID is not provided or if the attendance type is not found.
*/
export const getAttendanceTypeById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the attendance type by id
    const attendanceType = await AttendanceType.query().findById(id).withGraphFetched(withGraphFetched);

    if (!attendanceType) {
        throw new Error('Attendance type not found');
    }

    return attendanceType;
}


/**
 * Creates a new attendance type.
 * @param {Object} attendanceType - The attendance type to be created.
 * @param {string} attendanceType.title - The title of the attendance type.
 * @returns {Promise<Object>} - A promise that resolves to the newly created attendance type.
 * @throws {Error} - If attendance type is not provided, is missing required fields, or already exists.
 */
export const createAttendanceType = async (attendanceType) => {

    // Check if attendance type is provided
    if (!attendanceType) {
        throw new Error('Attendance type is required');
    }

    // Check if attendance type has all required fields
    if (!attendanceType.title) {
        throw new Error('Attendance type is missing required fields');
    }

    // Check if the attendance type already exists
    const existingAttendanceType = await AttendanceType.query().findOne({ title: attendanceType.title });

    if (existingAttendanceType) {
        throw new Error('Attendance type already exists');
    }

    // Create the attendance type
    const newAttendanceType = await AttendanceType.query().insert(attendanceType);

    return newAttendanceType;
}


/**
 * Updates the attendance type with the provided id.
 * @param {number} id - The id of the attendance type to update.
 * @param {object} attendanceType - The updated attendance type object.
 * @returns {Promise<object>} - A promise that resolves to the updated attendance type object.
 * @throws {Error} - If id or attendanceType is not provided, or if the attendance type is not found.
 */
export const updateAttendanceType = async (id, attendanceType) => {

    // Check if id is provided
    if (!id || !attendanceType) {
        throw new Error('Id and attendance type are required');
    }

    // Check if the attendance type exists
    const existingAttendanceType = await AttendanceType.query().findById(id);

    if (!existingAttendanceType) {
        throw new Error('Attendance type not found');
    }

    // Update the attendance type
    const updatedAttendanceType = await AttendanceType.query().patchAndFetchById(id, attendanceType);

    return updatedAttendanceType;
}


/**
 * Deletes an attendance type by its ID.
 * @param {number} id - The ID of the attendance type to delete.
 * @returns {Promise<number>} - The ID of the deleted attendance type.
 * @throws {Error} If the ID is not provided or if the attendance type is not found.
 */
export const deleteAttendanceType = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if the attendance type exists
    const existingAttendanceType = await AttendanceType.query().findById(id);

    if (!existingAttendanceType) {
        throw new Error('Attendance type not found');
    }

    // Delete the attendance type
    await AttendanceType.query().deleteById(id);

    return id;
}