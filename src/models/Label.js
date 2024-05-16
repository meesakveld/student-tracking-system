import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import Student from "./Student.js";

// define the NavigationItem model
class Label extends Model {
    static get tableName() {
        return "labels";
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
                users: {
                    relation: Model.ManyToManyRelation,
                    modelClass: User,
                    join: {
                        from: "labels.id",
                        through: {
                            from: "students_labels.label_id",
                            to: "students_labels.student_id",
                        },
                        to: "students.id",
                    },
                },
        };
    }

    static get relationMappings() { }
}

export default Label;