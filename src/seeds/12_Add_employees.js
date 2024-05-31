const tableName = "employees"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            user_id: 1
        },
        {
            user_id: 4
        },
        {
            user_id: 5
        },
        {
            user_id: 6
        },
        {
            user_id: 7
        },
        {
            user_id: 8
        },
        {
            user_id: 9
        }
    ]);
};

export { seed };