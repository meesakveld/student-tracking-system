const tableName = "course_links"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            employee_id: 1,
            course_id: 1,
        },
        {
            employee_id: 2,
            course_id: 4,
        },
    ]);
};

export { seed };