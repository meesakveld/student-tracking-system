const tableName = "statuses"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            title: "Inactief"
        },
        {
            title: "Grotendeels inactief"
        },
        {
            title: "Middelmachtig actief"
        },
        {
            title: "Ziek"
        },
        {
            title: "Uitgeschreven"
        },
    ]);
};

export { seed };