import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

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
                title: { type: "string" },
                slug: { type: "string" },
                academic_year: { type: "string" },
                code: { type: "string"}
            },
        };
    }

    static get relationMappings() { }
}

export default EducationProgramme;