import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import Class from "./Class.js";
import ProgrammeLine from "./ProgrammeLine.js";
import Course from "./Course.js";

// define the NavigationItem model
class EducationProgramme extends Model {
    static get tableName() {
        return "education_programmes";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "slug", "academic_year", "code"],
            properties: {
                id: { type: "integer" },
                title: { type: "string", maxLength: 255 },
                slug: { type: "string", maxLength: 255 },
                academic_year: { type: "string", maxLength: 255 },
                code: { type: "string", maxLength: 255 }
            },
        };
    }

    static get relationMappings() {
        return {
            class: {
                relation: Model.HasManyRelation,
                modelClass: Class,
                join: {
                    from: "education_programmes.id",
                    to: "classes.education_programme_id",
                },
            },
            programme_lines: {
                relation: Model.HasManyRelation,
                modelClass: ProgrammeLine,
                join: {
                    from: "education_programmes.id",
                    to: "programme_lines.education_programme_id",
                },
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comment,
                join: {
                    from: "education_programmes.id",
                    to: "comments.education_programme_id",
                },
            },
            courses: {
                relation: Model.HasManyRelation,
                modelClass: Course,
                join: {
                    from: "education_programmes.id",
                    to: "courses.education_programme_id",
                },
            },
        }
    }
}

export default EducationProgramme;