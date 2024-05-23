import Student from "../../models/Student";


export const getAllStudents = async (withGraphFetched = '[]') => {

    // Get all students
    const students = await Student.query().withGraphFetched(withGraphFetched);

    // Check if students are found
    if (!students) {
        throw new Error('No students found');
    }

    return students;

}


export const getStudentById = async (id, withGraphFetched = '[]') => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Get the student by id
    const student = await Student.query().findById(id).withGraphFetched(withGraphFetched);

    // Check if student is found
    if (!student) {
        throw new Error('Student not found');
    }

    return student;

}


export const createStudent = async (student) => {

    // Check if student is provided
    if (!student) {
        throw new Error('Student is required');
    }

    // Check if student has all required fields
    if (!student.user_id || !student.class_id) {
        throw new Error('Student is missing required fields');
    }

    // Check if student with the same user_id already exists
    const existingStudent = await Student.query().findOne({ user_id: student.user_id });

    if (existingStudent) {
        throw new Error('Student already exists');
    }

    // Create the student
    const student = await Student.query().insert(student);

    return student;
}


export const updateStudent = async (id, student) => {

    // Check if id is provided
    if (!id || !student) {
        throw new Error('Id and student are required');
    }

    // Check if student exists
    const existingStudent = await Student.query().findById(id);

    if (!existingStudent) {
        throw new Error('Student not found');
    }

    // Check if user_id is being updated, and if so, check if it already exists
    if (student.user_id) {
        const existingStudent = await Student.query().findOne({ user_id: student.user_id });

        if (existingStudent) {
            throw new Error('Student with the same user_id already exists');
        }
    }

    // Update the student
    const updatedStudent = await Student.query().patchAndFetchById(id, student);

    return updatedStudent;

}


export const deleteStudent = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if student exists
    const existingStudent = await Student.query().findById(id);

    if (!existingStudent) {
        throw new Error('Student not found');
    }

    // Delete the student
    const deletedStudent = await Student.query().deleteById(id);

    return deletedStudent;

}