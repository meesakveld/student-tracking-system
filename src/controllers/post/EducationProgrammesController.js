export const createEducationProgramme = async (req, res, next) => {

}

export const updateEducationProgramme = async (req, res, next) => {

}

export const deleteEducationProgramme = async (req, res, next) => {

}

export const handleEducationProgramme = async (req, res, next) => {
    const method = req.body.method;
    
    if (method === "POST") {
        createEducationProgramme(req, res, next);
    }

    if (method === "PATCH") {
        updateEducationProgramme(req, res, next);
    }

    if (method === "DELETE") {
        deleteEducationProgramme(req, res, next);
    }
    
}