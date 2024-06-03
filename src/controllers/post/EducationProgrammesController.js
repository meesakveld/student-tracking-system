import EducationProgramme from "../../models/EducationProgramme.js"

export const createEducationProgramme = async (req, res, next) => {

    try {
        const data = req.data;

        const educationProgramme = {
            title: data.educationProgramme.title,
            slug: data.educationProgramme.slug,
            academic_year: data.educationProgramme.academic_year,
            code: data.educationProgramme.code,
            programme_lines: data.programmaLines,
            courses: data.courses,
            classes: data.classes
        };

        const newEducationProgramme = await EducationProgramme.query().insertGraph(educationProgramme, { relate: true });

        return res.redirect(`/education-programmes/${newEducationProgramme.id}`);

    } catch (error) {
        console.log(error);
        req.pageError = error.message;
        next();
    }

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