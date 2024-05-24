const tableName = "employees"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            user_id: 1,
            id: 1
        }
    ]);
};

export { seed };