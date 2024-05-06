const tableName = "users"; //! Change TABLENAME to the name of the table you want to create

// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("firstname").notNullable();
        table.string("lastname").notNullable();
        table.string("username").notNullable().unique();
        table.timestamps(true, true);
    });
}

// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}