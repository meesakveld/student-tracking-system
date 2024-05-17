import knex from "../lib/Knex.js";
import { Model } from "objection";
import EducationProgramme from "./EducationProgramme.js";
import Student from "./Student.js";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Class extends Model {
    static get tableName() {
        return "classes";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "education_programme_id"],
            properties: {
                id: { type: "integer" },
                name: { type: "string", maxLength: 255 },
                education_programme_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() {
        return{
            education_programmes: {
                relation: Model.HasManyRelation,
                modelClass: EducationProgramme,
                join: {
                    from: "classes.education_programme_id",
                    to: "education_programmes.id",
                },
            },
            students: {
                relation: Model.HasOneRelation,
                modelClass: Student,
                join: {
                    from: "classes.id",
                    to: "students.class_id",
                },
            }
        }
    }
}

export default Class;