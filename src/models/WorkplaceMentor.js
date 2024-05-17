import knex from "../lib/Knex.js";
import { Model } from "objection";
import Course from "./Course.js";

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
            // courses: {
            //     relation: Model.HasManyRelation,
            //     modelClass: Course,
            //     join: {
            //         from: "education_programmes.id",
            //         to: "courses.education_programme_id",
            //     },
            // },
            // courses_workplace: {
            //     relation: Model.BelongsToOneRelation,
            //     modelClass: Course,
            //     join: {
            //         from: "course_registrations.course_id",
            //         to: "courses.id",
            //     },
            // },
        }
    }
}

export default CourseRegistration;