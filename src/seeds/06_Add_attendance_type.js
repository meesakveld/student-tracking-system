const tableName = "attendance_types"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            title: "Stipt aanwezig"
        },
        {
            title: "Later aanwezig"
        },
        {
            title: "Afwezig met geldige reden"
        },
        {
            title: "Afwezig zonder geldige reden"
        }
    ]);
};

export { seed };