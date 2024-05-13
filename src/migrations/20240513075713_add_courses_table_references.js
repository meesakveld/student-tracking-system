const tableName = "courses"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.table(tableName, function (table) {
        table.foreign("education_programme_id").references("education_programmes.id");
        table.foreign("programme_line_id").references("programme_lines.id");
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.table(tableName, function (table) {
        table.dropForeign("education_programme_id");
        table.dropForeign("programme_line_id");
    });
}