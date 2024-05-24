const tableName = "comments"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            course_id: 1,
            student_id: 1,
            employee_id: 1,
            education_programme_id: 1,
            comment: "This is a comment",
        },
    ]);
};

export { seed };