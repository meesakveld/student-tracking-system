const tableName = "course_registrations"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            student_id: 1,
            course_id: 1
        },
        {
            student_id: 1,
            course_id: 6
        },
        {
            student_id: 2,
            course_id: 1
        },
        {
            student_id: 2,
            course_id: 2
        }
    ]);
};

export { seed };