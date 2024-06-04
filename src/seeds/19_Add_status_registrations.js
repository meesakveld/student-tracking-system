const tableName = "statuses_registrations"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            status_id: 5,
            student_id: 1,
            deregister_id: 1,
            date: "2021-01-01",
        }
    ]);
};

export { seed };