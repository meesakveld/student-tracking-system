import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import Contact from "./Contact.js";
import Student from "./Student.js";
import Employee from "./Employee.js";
import Role from "./Role.js";

// define the NavigationItem model
class User extends Model {
    static get tableName() {
        return "users";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["firstname", "lastname", "email", "password", "username"],
            properties: {
                id: { type: "integer" },
                firstname: { type: "string", maxLength: 255 },
                lastname: { type: "string", maxLength: 255 },
                is_active: { type: "boolean" },
                email: { type: "string", maxLength: 255 },
                password: { type: "string", maxLength: 255 },
                username: { type: "string", maxLength: 255 },
            },
        };
    }

    static get relationMappings() {
        return {
            contacts: {
                relation: Model.HasOneRelation,
                modelClass: Contact,
                join: {
                    from: "users.id",
                    to: "contacts.user_id",
                },
            },
            students: {
                relation: Model.HasOneRelation,
                modelClass: Student,
                join: {
                    from: "users.id",
                    to: "students.user_id",
                },
            },
            employees: {
                relation: Model.HasOneRelation,
                modelClass: Employee,
                join: {
                    from: "users.id",
                    to: "employees.user_id",
                },
            },
            role: {
                relation: Model.HasOneRelation,
                modelClass: Role,
                join: {
                    from: "users.role_id",
                    to: "roles.id",
                },
            }
        };
    }
}

export default User;