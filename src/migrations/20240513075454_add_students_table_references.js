const tableName = "students"; //! Change TABLENAME to the name of the table you want to create

// Create the table (this is for creating the migration)
export function up(knex) {
    return knex.schema.table(tableName, function (table) {
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
    return knex.schema.table(tableName, function (table) {
        table.dropForeign("user_id");
        table.dropForeign("class_id");
        table.dropForeign("role_id");
        table.dropForeign("trajectory_coach_id");
        table.dropForeign("learning_coach_id");
        table.dropForeign("diversity_coach_id");
        table.dropForeign("status_id");
        table.dropForeign("deregister_id");
    });
}