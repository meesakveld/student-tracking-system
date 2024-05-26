const tableName = "labels"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            title: "Vdab"
        },
        {
            title: "Bijzo"
        },
        {
            title: "Stuver"
        },
        {
            title: "Excellence"
        },
        {
            title: "Ambassadeur"
        },
    ]);
};

export { seed };