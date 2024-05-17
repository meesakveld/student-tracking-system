const tableName = "education_programmes_employees"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.integer("education_programme_id").notNullable();
        table.integer("employee_id").notNullable();

        table.foreign("education_programme_id").references("education_programmes.id");
        table.foreign("employee_id").references("employees.id");
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}