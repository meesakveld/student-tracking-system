const tableName = "course_links"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("employee_id").notNullable();
        table.integer("course_id").notNullable();
        table.timestamps(true, true);

        table.foreign("employee_id").references("employees.id");
        table.foreign("course_id").references("courses.id");
    });
}

 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}