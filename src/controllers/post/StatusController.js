import { validationResult } from "express-validator";
import StatusesRegistration from "../../models/StatusesRegistration.js";

export const createStatus = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.pageError = errors.array().map(error => error.msg).join(", ");
        return next();
    }

    try {
        const status_id = parseInt(req.body.statusType);
        const student_id = parseInt(req.params.studentId);
        const note = req.body.note !== "" ? req.body.note : null;
        const date = new Date().toISOString();

        let newStatus = {
            status_id: status_id,
            student_id: student_id,
            date: date,
        };

        if (note) {
            newStatus.note = note;
        }

        await StatusesRegistration.query().insert(newStatus);

        next();
    } catch (error) {
        req.pageError = error.message;
        next();
    }
}

export const handleStatus = async (req, res, next) => {
    const method = req.body.method;

    if (method === "POST") {
        createStatus(req, res, next);
    }
}
