const tableName = "education_programmes_employees"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            education_programme_id: 14,
            employee_id: 1,
        }
    ]);
};

export { seed };