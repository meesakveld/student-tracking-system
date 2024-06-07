import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import User from "./User.js";
import Student from "./Student.js";
import Comment from "./Comment.js";
import WorkplaceCoach from "./WorkplaceCoach.js";
import Course from "./Course.js";
import EducationProgramme from "./EducationProgramme.js";
import Function from "./Function.js";

// define the NavigationItem model
class Employee extends Model {
    static get tableName() {
        return "employees";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user_id"],
            properties: {
                id: { type: "integer" },
                user_id: { type: "integer" },
            },
        };
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "employees.user_id",
                    to: "users.id",
                },
            },
            trajectory_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Student,
                join: {
                    from: "employees.id",
                    to: "students.trajectory_coach_id",
                },
            },
            learning_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Student,
                join: {
                    from: "employees.id",
                    to: "students.learning_coach_id",
                },
            },
            diversity_coach: {
                relation: Model.BelongsToOneRelation,
                modelClass: Student,
                join: {
                    from: "employees.id",
                    to: "students.diversity_coach_id",
                },
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comment,
                join: {
                    from: "employees.id",
                    to: "comments.employee_id",
                },
            },
            workplace_coaches: {
                relation: Model.HasManyRelation,
                modelClass: WorkplaceCoach,
                join: {
                    from: "employees.id",
                    to: "workplace_coach.employee_id",
                },
            },
            courses: {
                relation: Model.ManyToManyRelation,
                modelClass: Course,
                join: {
                    from: "employees.id",
                    through: {
                        from: "course_links.employee_id",
                        to: "course_links.course_id",
                    },
                    to: "courses.id",
                },
            },
            education_programmes: {
                relation: Model.ManyToManyRelation,
                modelClass: EducationProgramme,
                join: {
                    from: "employees.id",
                    through: {
                        from: "education_programmes_employees.employee_id",
                        to: "education_programmes_employees.education_programme_id",
                    },
                    to: "education_programmes.id",
                },
            },
            functions: {
                relation: Model.ManyToManyRelation,
                modelClass: Function,
                join: {
                    from: "employees.id",
                    through: {
                        from: "employee_functions.employee_id",
                        to: "employee_functions.function_id",
                    },
                    to: "functions.id",
                },
            },
        }
    }
}

export default Employee;