const tableName = "workplace_coaches"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            student_id: 1,
            course_id: 1,
            employee_id: 1,
        }
    ]);
};

export { seed };