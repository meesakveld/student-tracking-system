import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Course extends Model {
    static get tableName() {
        return "courses";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "education_programme_id", "programme_line_id"],
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                description: { type: "text", minLength: 1, maxLength: 255 },
                study_points: { type: "integer" },
                contact_hours: { type: "integer" },
                period: { type: "string" },
                semester: { type: "string" },
                education_programme_id: { type: "integer" },
                programme_line_id: { type: "integer"}
            },
        };
    }

    static get relationMappings() { }
}

export default Course;