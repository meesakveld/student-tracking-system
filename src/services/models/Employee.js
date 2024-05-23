import Employee from "../../models/Employee";

/**
 * Retrieves all employees with optional graph fetching.
 * @param {string} withGraphFetched - The graph to be fetched (optional, default is '[]').
 * @returns {Promise<Array>} - A promise that resolves to an array of employees.
 * @throws {Error} - If no employees are found.
 */
export const getAllEmployee = async (withGraphFetched = '[]') => {
    
    // Get all employees
    const employees = await Employee.query().withGraphFetched(withGraphFetched);
    
    // Check if employees are found
    if (!employees) {
        throw new Error('No employees found');
    }
    
    return employees;

}


/**
 * Retrieves an employee by their ID.
 * @param {number} id - The ID of the employee.
 * @param {string} [withGraphFetched='[]'] - The graph to fetch along with the employee.
 * @returns {Promise<Object>} - A promise that resolves to the employee object.
 * @throws {Error} - If the ID is not provided or if the employee is not found.
 */
export const getEmployeeById = async (id, withGraphFetched = '[]') => {
        
        // Check if id is provided
        if (!id) {
            throw new Error('Id is required');
        }
        
        // Get the employee by id
        const employee = await Employee.query().findById(id).withGraphFetched(withGraphFetched);
        
        // Check if employee is found
        if (!employee) {
            throw new Error('Employee not found');
        }
        
        return employee;

}


/**
 * Creates a new employee.
 * @param {Object} employee - The employee object to be created.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.email - The email of the employee.
 * @param {string} employee.phone - The phone number of the employee.
 * @param {string} employee.address - The address of the employee.
 * @returns {Promise<Object>} - A promise that resolves to the newly created employee object.
 * @throws {Error} - If the employee object is not provided or if it is missing required fields.
 */
export const createEmployee = async (employee) => {

    // Check if employee is provided
    if (!employee) {
        throw new Error('Employee is required');
    }

    // Check if employee has required fields
    if (!employee.name || !employee.email || !employee.phone || !employee.address) {
        throw new Error('Employee is missing required fields');
    }

    // Create the employee
    const newEmployee = await Employee.query().insert(employee);

    return newEmployee;

}


/**
 * Updates an employee with the provided id.
 * @param {number} id - The id of the employee to update.
 * @param {object} employee - The updated employee object.
 * @returns {Promise<object>} - A promise that resolves to the updated employee object.
 * @throws {Error} - If id or employee is not provided, or if the employee is not found.
 */
export const updateEmployee = async (id, employee) => {

    // Check if employee is provided
    if (!id || !employee) {
        throw new Error('Id and employee are required');
    }

    // Check if employee is found
    const existingEmployee = await Employee.query().findById(id);

    if (!existingEmployee) {
        throw new Error('Employee not found');
    }

    // Update the employee
    const updatedEmployee = await Employee.query().findById(id).patch(employee);

    return updatedEmployee;

};

export const deleteEmployee = async (id) => {

    // Check if id is provided
    if (!id) {
        throw new Error('Id is required');
    }

    // Check if employee is found
    const existingEmployee = await Employee.query().findById(id);

    if (!existingEmployee) {
        throw new Error('Employee not found');
    }

    // Delete the employee
    const deletedEmployee = await Employee.query().deleteById(id);

    return deletedEmployee;
    
};