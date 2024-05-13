const tableName = "courses"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.text("description");
        table.integer("study_points");
        table.integer("contact_hours");
        table.integer("period");
        table.integer("semester");
        table.integer("education_programme_id").notNullable();
        table.integer("programme_line_id").notNullable();
        table.timestamps(true, true);
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}