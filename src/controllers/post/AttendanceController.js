export const createAttendance = async (req, res, next) => {

}

export const updateAttendance = async (req, res, next) => {

}

export const deleteAttendance = async (req, res, next) => {

}

export const handleAttendance = async (req, res, next) => {
    const method = req.body.method;

    if (method === "POST") {
        createAttendance(req, res, next);
    }

    if (method === "PATCH") {
        updateAttendance(req, res, next);
    }

    if (method === "DELETE") {
        deleteAttendance(req, res, next);
    }

}