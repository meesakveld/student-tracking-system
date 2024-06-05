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
        const deregister = req.body.deregister;
        const date = req.body.date;

        if (!status_id) {
            req.pageError = "Een status is verplicht.";
            return next();
        }

        const newStatus = {
            status_id: status_id,
            student_id: student_id,
            deregister: deregister,
            date: date
        };


        const statusRegistration = await StatusesRegistration.query().insert(newStatus);
        res.json({ message: "success", detail: "Status is toegevoegd." });
        // return res.redirect(`/students/${student_id}/status`);

        
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