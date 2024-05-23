import Course from "../models/Course";

/**
 * Retrieves all courses with optional graph fetching.
 *
 * @param {string} [withGraphFetced='[]'] - The graph to fetch along with the courses.
 * @returns {Promise<Array>} - A promise that resolves to an array of courses.
 * @throws {Error} - If no courses are found.
 */
export const getAllCourse = async (withGraphFetced = '[]') => {

    // Get all courses
    const courses = await Course.query().withGraphFetched(withGraphFetced);

    // Check if courses are found
    if (!courses) {
        throw new Error('No courses found');
    }

    return courses;
}


/**
 * Retrieves a course by its ID.
 * @param {number} id - The ID of the course to retrieve.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the course.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved course.
 * @throws {Error} - If the ID is not provided or if the course is not found.
 */
export const getCourseById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the course by id
    const course = await Course.query().findById(id).withGraphFetched(withGraphFetched);

    // Check if course is found
    if (!course) {
        throw new Error('Course not found');
    }

    return course;

}


/**
 * Creates a new course.
 * @param {Object} course - The course object to be created.
 * @param {string} course.name - The name of the course.
 * @param {string} course.education_programme_id - The ID of the education programme associated with the course.
 * @param {string} course.programme_line_id - The ID of the programme line associated with the course.
 * @returns {Promise<Object>} - A promise that resolves to the newly created course object.
 * @throws {Error} - If the course object is not provided or if it is missing required fields.
 */
export const createCourse = async (course) => {
    
        // Check if course is provided
        if (!course) {
            throw new Error('Course is required');
        }
    
        // Check if required fields are provided
        if (!course.name || !course.education_programme_id || !course.programme_line_id) {
            throw new Error('Course is missing required fields');
        }
    
        // Create the course
        const newCourse = await Course.query().insert(course);
    
        return newCourse;
};


/**
 * Updates a course with the given id.
 * @param {number} id - The id of the course to update.
 * @param {object} course - The updated course object.
 * @returns {Promise<object>} - The updated course object.
 * @throws {Error} - If id or course is missing.
 * @throws {Error} - If the course with the given id is not found.
 */
export const updateCourse = async (id, course) => {
    
    // Check if id and course are provided
    if (!id || !course) {
        throw new Error('Id and course are required');
    }

    // Check if course is found
    const existingCourse = await Course.query().findById(id);

    if (!existingCourse) {
        throw new Error('Course not found');
    }

    // Update the course
    const updatedCourse = await Course.query().findById(id).patch(course);

    return updatedCourse;
}


/**
 * Deletes a course by its ID.
 * @param {number} id - The ID of the course to delete.
 * @returns {Promise<number>} - A promise that resolves to the number of deleted courses.
 * @throws {Error} - If the ID is not provided or if the course is not found.
 */
export const deleteCourse = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if course is found
    const existingCourse = await Course.query().findById(id);

    if (!existingCourse) {
        throw new Error('Course not found');
    }

    // Delete the course
    const deletedCourse = await Course.query().deleteById(id);

    return deletedCourse;
}