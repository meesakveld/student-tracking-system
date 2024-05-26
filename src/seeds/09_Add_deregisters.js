const tableName = "deregisters"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            student_id: 1,
            reason: "Personal reasons",
            deregisters_date: "2023-12-31"
        }
    ]);
};

export { seed };