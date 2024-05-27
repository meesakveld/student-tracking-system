const tableName = "contacts"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            user_id: 1,
            website: "www.test.com",
            linkedin: "www.linkedin.com",
            facebook: "www.facebook.com",
        }
    ]);
};

export { seed };