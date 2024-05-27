const tableName = "employee_functions"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            employee_id: 1,
            function_id: 7,
        }
    ]);
};

export { seed };