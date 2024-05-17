const tableName = "statuses_registrations"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("status_id").notNullable();
        table.integer("student_id").notNullable();
        table.date("date").notNullable();
        table.timestamps(true, true);

        table.foreign("status_id").references("statuses.id");
        table.foreign("student_id").references("students.id");
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}