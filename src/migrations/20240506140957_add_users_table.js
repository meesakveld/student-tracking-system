const tableName = "users"; //! Change TABLENAME to the name of the table you want to create

// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.string("firstname").notNullable();
        table.string("lastname").notNullable();
        table.boolean("is_active").notNullable().defaultTo(true);
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.integer("role_id").notNullable();
        table.timestamps(true, true);
    });
}

// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}