import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import Student from "./Student.js";

// define the NavigationItem model
class Deregister extends Model {
    static get tableName() {
        return "deregisters";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["reason", "deregisters_date", "student_id"],
            properties: {
                id: { type: "integer" },
                reason: { type: "text" },
                deregisters_date: { type: "date" },
                student_id: { type: "integer"},
            },
        };
    }

    static get relationMappings() {
        return {
            student: {
                relation: Model.BelongsToOneRelation,
                modelClass: Student,
                join: {
                    from: "deregisters.student_id",
                    to: "students.id",
                },
            },
            statusRegistrations: {
                relation: Model.HasOneRelation,
                modelClass: StatusesRegistration,
                join: {
                    from: "deregisters.statuses_registration_id",
                    to: "statuses_registrations.id",
                },
            },
        }
    }
}

export default Deregister