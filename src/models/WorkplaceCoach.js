import knex from "../lib/Knex.js";
import { Model } from "objection";
import Employee from "./Employee.js";
import Student from "./Student.js";
import Course from "./Course.js";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class WorkplaceCoach extends Model {
    static get tableName() {
        return "workplace_coaches";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["student_id", "course_id", "employee_id"],
            properties: {
                id: { type: "integer" },
                student_id: { type: "integer" },
                course_id: { type: "integer" },
                employee_id: { type: "integer"}
            },
        };
    }

    static get relationMappings() {
        return {
            employees: {
                relation: Model.BelongsToOneRelation,
                modelClass: Employee,
                join: {
                    from: "workplace_coach.employee_id",
                    to: "employees.id",
                },
            },
            courses: {
                relation: Model.BelongsToOneRelation,
                modelClass: Course,
                join: {
                    from: "workplace_coach.course_id",
                    to: "courses.id",
                },
            },
            student: {
                relation: Model.BelongsToOneRelation,
                modelClass: Student,
                join: {
                    from: "workplace_coach.student_id",
                    to: "students.id",
                },
            },
        }
    }
}

export default WorkplaceCoach;