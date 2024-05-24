const tableName = "classes"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            name: "1-PGM-A",
            education_programme_id: 14
        },
        {
            name: "1-PGM-B",
            education_programme_id: 14
        },
        {
            name: "1-PGM-C",
            education_programme_id: 14
        },
    ]);
};

export { seed };