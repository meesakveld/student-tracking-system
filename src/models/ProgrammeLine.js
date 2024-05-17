
import knex from "../lib/Knex.js";
import { Model } from "objection";
import EducationProgramme from "./EducationProgramme.js";
import Course from "./Course.js";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class ProgrammeLine extends Model {
    static get tableName() {
        return "programme_lines";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "slug", "education_programme_id"],
            properties: {
                id: { type: "integer" },
                name: { type: "string", maxLength: 255 },
                slug: { type: "string", maxLength: 255 },
                description: { type: "text" },
                study_points: { type: "integer" },
                education_programme_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() {
        return {
            education_programmes: {
                relation: Model.BelongsToOneRelation,
                modelClass: EducationProgramme,
                join: {
                    from: "education_programmes.id",
                    to: "programme_lines.education_programme_id",
                },
            },
            courses: {
                relation: Model.HasManyRelation,
                modelClass: Course,
                join: {
                    from: "programme_lines.id",
                    to: "courses.programme_line_id",
                },
            },
        }
    }
}

export default ProgrammeLine;