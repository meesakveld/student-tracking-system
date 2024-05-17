const tableName = "statuses"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            title: "Inactive"
        },
        {
            title: "Largely Inactive"
        },
        {
            title: "Moderlaty Active"
        },
        {
            title: "Sick"
        },
        {
            title: "Deregistered"
        },
    ]);
};

export { seed };