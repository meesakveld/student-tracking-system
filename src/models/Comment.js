import knex from "../lib/Knex.js";
import { Model } from "objection";
import Employee from "./Employee.js";
import EducationProgramme from "./EducationProgramme.js";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Comment extends Model {
    static get tableName() {
        return "comments";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["student_id", "employee_id", "education_programme_id", "comment"],
            properties: {
                id: { type: "integer" },
                course_id: { type: "integer" },
                student_id: { type: "integer" },
                employee_id: { type: "integer" },
                education_programme_id: { type: "integer" },
                comment: { type: "text"},
            },
        };
    }

    static get relationMappings() {
        return {
            employees: {
                relation: Model.BelongsToOneRelation,
                modelClass: Employee,
                join: {
                    from: "comments.employee_id",
                    to: "employee.id",
                },
            },
            education_programme: {
                relation: Model.BelongsToOneRelation,
                modelClass: EducationProgramme,
                join: {
                    from: "comments.education_programme_id",
                    to: "education_programme.id",
                },
            },

        }
    }
}

export default Comment;