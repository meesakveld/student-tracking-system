import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class Student extends Model {
    static get tableName() {
        return "students";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id", "class_id", "role_id"],
            properties: {
                id: { type: "integer" },
                user_id: { type: "integer" },
                class_id: { type: "integer" },
                role_id: { type: "integer" },
                trajectory_coach_id : { type: "integer" },
                learning_coach_id: { type: "integer" },
                diversity_coach_id: { type: "integer" },
                status_id: { type: "integer" },
                deregister_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() { }
}

export default Student;