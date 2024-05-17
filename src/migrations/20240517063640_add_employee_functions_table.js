const tableName = "employee_functions"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.integer("employee_id").notNullable();
        table.integer("function_id").notNullable();

        table.foreign("employee_id").references("employees.id");
        table.foreign("function_id").references("functions.id");
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}