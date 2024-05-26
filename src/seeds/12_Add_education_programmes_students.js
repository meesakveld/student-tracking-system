const tableName = "education_programmes_students"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            education_programme_id: 14,
            student_id: 1
        },
        {
            education_programme_id: 14,
            student_id: 2
        }
    ]);
};

export { seed };