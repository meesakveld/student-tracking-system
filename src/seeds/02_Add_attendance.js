const tableName = "attendances"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            student_id: 1,
            course_id: 1,
            date: "2021-01-01",
            attendance_type_id: 1,
        }
    ]);
};

export { seed };