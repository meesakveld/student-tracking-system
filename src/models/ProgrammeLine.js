
import knex from "../lib/Knex.js";
import { Model } from "objection";

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
                description: { type: "text", minLength: 1, maxLength: 255 },
                study_points: { type: "integer" },
                education_programme_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() { }
}

export default ProgrammeLine;