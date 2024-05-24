const tableName = "functions"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            title: "admin"
        },
        {
            title: "teacher"
        },
        {
            title: "trajectory coach"
        },
        {
            title: "learning coach"
        },
        {
            title: "diversity coach"
        },
        {
            title: "workplace coach"
        },
        {
            title: "teamleader"
        },
    ]);
};

export { seed };