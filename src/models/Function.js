import knex from "../lib/Knex.js";
import { Model } from "objection";
import Course from "./Course.js";
import Employee from "./Employee.js";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class CourseRegistration extends Model {
    static get tableName() {
        return "functions";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["student_id", "course_id", "mentor_id"],
            properties: {
                id: { type: "integer" },
                student_id: { type: "integer" },
                course_id: { type: "integer" },
                mentor_id: { type: "integer" },

            },
        };
    }

    static get relationMappings() {
        return {
            employee: {
                relation: Model.ManyToManyRelation,
                modelClass: Employee,
                join: {
                    from: "function.id",
                    through: {
                        from: "employee_function.function_id",
                        to: "employee_function.employee_id",
                    },
                    to: "employee.id",
                },
            },
        }
    }
}

export default CourseRegistration;