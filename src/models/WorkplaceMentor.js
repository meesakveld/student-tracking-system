import knex from "../lib/Knex.js";
import { Model } from "objection";
import Course from "./Course.js";
import Student from "./Student.js";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class CourseRegistration extends Model {
    static get tableName() {
        return "course_registrations";
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
                mentor_id: { type: "integer"},
                
            },
        };
    }

    static get relationMappings() {
        return {
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

export default CourseRegistration;