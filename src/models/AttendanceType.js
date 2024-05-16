import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
// import ... from "./...js";

// define the NavigationItem model
class AttendanceType extends Model {
    static get tableName() {
        return "attendance_types";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title"],
            properties: {
                id: { type: "integer" },
                title: { type: "string", maxLength: 255 }
            },
        };
    }

    static get relationMappings() {
        return {
            attendances: {
                relation: Model.BelongsToOneRelation,
                modelClass: Attendance,
                join: {
                    from: "attendances.attendance_type_id",
                    to: "attendance_types.id",
                },
            },
        };
    }
}

export default AttendanceType;