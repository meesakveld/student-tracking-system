import knex from "../lib/Knex.js";
import { Model } from "objection";
import Employee from "./Employee.js";

// instantiate the model
Model.knex(knex);

// related models
import Attendance from "./Attendance.js";
import Label from "./Label.js";
import User from "./User.js";
import Employee from "./Employee.js";
import WorkplaceMentor from "./WorkplaceMentor.js";
import Deregister from "./Deregister.js";

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
                trajectory_coach_id : { type: "integer" },
                learning_coach_id: { type: "integer" },
                diversity_coach_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() {
        return {
            attendances: {
                relation: Model.BelongsToOneRelation,
                modelClass: Attendance,
                join: {
                    from: "students.id",
                    to: "attendances.student_id",
                },
            },
            // labels: {
            //     relation: Model.ManyToManyRelation,
            //     modelClass: Label,
            //     join: {
            //         from: "employees.id",
            //         through: {
            //             from: "course_registration.account_id",
            //             to: "course_registration.course_id",
            //         },
            //         to: "courses.id",
            //     },
            // },
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "students.user_id",
                    to: "users.id",
                },
            },
            trajectory_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Employee,
                join: {
                    from: "students.trajectory_coach_id",
                    to: "employees.id",
                },
            },
            learning_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Employee,
                join: {
                    from: "students.learning_coach_id",
                    to: "employees.id",
                },
            },
            diversity_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Employee,
                join: {
                    from: "students.diversity_coach_id",
                    to: "employees.id",
                },
            },
            workplace_mentor: {
                relation: Model.BelongsToOneRelation,
                modelClass: WorkplaceMentor,
                join: {
                    from: "students.diversity_coach_id",
                    to: "employees.id",
                },
            },
            deregistrer: {
                relation: Model.HasManyRelation,
                modelClass: Deregister,
                join: {
                    from: "students.id",
                    to: "deregisters.student_id",
                },
            }   
        }
    }
}

export default Student;