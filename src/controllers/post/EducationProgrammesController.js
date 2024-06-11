import EducationProgramme from "../../models/EducationProgramme.js"

export const createEducationProgramme = async (req, res, next) => {

    try {

        if (req.pageError || req.education_programme?.error || req.programme_lines?.error || req.courses?.error || req.classes?.error) {
            return next();
        }

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

    try {

        if (req.pageError || req.education_programme?.error || req.programme_lines?.error || req.courses?.error || req.classes?.error) {
            return next();
        }

        const data = req.data;
        const id = parseInt(req.params.id);

        const educationProgramme = {
            id: id,
            title: data.educationProgramme.title,
            slug: data.educationProgramme.slug,
            academic_year: data.educationProgramme.academic_year,
            code: data.educationProgramme.code,
            programme_lines: data.programmaLines,
            courses: data.courses,
            classes: data.classes
        };

        const updatedEducationProgramme = await EducationProgramme.query().upsertGraph(educationProgramme, { relate: true, unrelate: true });

        return res.redirect(`/education-programmes/${updatedEducationProgramme.id}`);

    } catch (error) {
        console.log(error);
        req.pageError = error.message;
        next();
    }

}

export const deleteEducationProgramme = async (req, res, next) => {
    return next()
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