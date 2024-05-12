const tableName = "students"; //! Change TABLENAME to the name of the table you want to create
 
// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        table.integer("user_id").notNullable()
        table.integer("class_id").notNullable();
        table.integer("role_id").notNullable();
        table.integer("trajectory_coach_id")
        table.integer("learning_coach_id")
        table.integer("diversity_coach_id")
        table.integer("status_id");
        table.integer("deregister_id");
        table.timestamps(true, true);

        table.foreign("user_id").references("users.id");
        table.foreign("class_id").references("classes.id");
        table.foreign("role_id").references("roles.id");
        table.foreign("trajectory_coach_id").references("employees.id");
        table.foreign("learning_coach_id").references("employees.id");
        table.foreign("diversity_coach_id").references("employees.id");
        table.foreign("status_id").references("statuses.id");
        table.foreign("deregister_id").references("deregisters.id");
    });
}
 
// Drop the table (this is for in case of reverting the migration)
export function down(knex) {
    return knex.schema.dropTable(tableName);
}