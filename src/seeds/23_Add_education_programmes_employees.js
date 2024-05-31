const tableName = "education_programmes_employees"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            education_programme_id: 14,
            employee_id: 1,
        },
        {
            education_programme_id: 14,
            employee_id: 2,
        },
        {
            education_programme_id: 14,
            employee_id: 3,
        },
        {
            education_programme_id: 14,
            employee_id: 4,
        },
        {
            education_programme_id: 14,
            employee_id: 5,
        },
        {
            education_programme_id: 14,
            employee_id: 6,
        },
        {
            education_programme_id: 14,
            employee_id: 7,
        }
    ]);
};

export { seed };