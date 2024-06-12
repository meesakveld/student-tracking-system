export const EducationProgrammeValidation = (req, res, next) => {
    try {
        const data = req.data;

        // ** ——— Education Programme ——— **
        // Title
        if (!data?.educationProgramme?.title) {
            throw {
                message: "Opleidingstitel is verplicht",
                type: "educationProgramme",
            };
        }

        // Academic Year
        if (!data?.educationProgramme?.academic_year) {
            throw {
                message: "Academisch jaar is verplicht",
                type: "educationProgramme",
            };
        }

        // Code
        if (!data?.educationProgramme?.code) {
            throw {
                message: "Programmacode is verplicht",
                type: "educationProgramme",
            };
        }

        // ** ——— Programme Lines ——— **
        // Check if there are programme lines
        if (!data?.programmaLines) {
            throw {
                message: "Minimaal één programmalijn is verplicht",
                type: "programmaLines",
            };
        }

        // Check if all programme line has all the required fields or check if all are empty
        data.programmaLines.forEach((programme_line, index) => {
            if (!programme_line.name) {
                if (!programme_line.description && !programme_line.study_points && index !== 0) {
                    return;
                }
                throw {
                    message: `Programmalijn ${index + 1}: naam is verplicht`,
                    type: "programmaLines",
                };
            }
            if (!programme_line.study_points) {
                if (!programme_line.name && !programme_line.description && index !== 0) {
                    return;
                }
                throw {
                    message: `Programmalijn ${index + 1}: studiepunten zijn verplicht`,
                    type: "programmaLines",
                };
            }
        });


        // ** ——— Courses ——— **
        // Check if there are courses
        if (!data?.courses) {
            throw {
                message: "Minimaal één vak is verplicht",
                type: "courses",
            };
        }

        // Check if all courses have all the required fields or check if all are empty
        data.courses.forEach((course, index) => {
            // required: name, description, period, study_points, contact_hours
            if (!course.name) {
                if (!course.description && !course.period && !course.study_points && !course.contact_hours  && index !== 0) {
                    return;
                }
                throw {
                    message: `Vak ${index + 1}: naam is verplicht`,
                    type: "courses",
                };
            }

            if (!course.period) {
                if (!course.name && !course.description && !course.study_points && !course.contact_hours && index !== 0) {
                    return;
                }
                throw {
                    message: `Vak ${index + 1}: periode is verplicht`,
                    type: "courses",
                };
            }

            if (!course.study_points) {
                if (!course.name && !course.description && !course.period && !course.contact_hours && index !== 0) {
                    return;
                }
                throw {
                    message: `Vak ${index + 1}: studiepunten zijn verplicht`,
                    type: "courses",
                };
            }

            if (!course.contact_hours) {
                if (!course.name && !course.description && !course.period && !course.study_points && index !== 0) {
                    return;
                }
                throw {
                    message: `Vak ${index + 1}: contacturen zijn verplicht`,
                    type: "courses",
                };
            }
        });

        next();

    } catch (error) {
        console.log(error)
        switch (error.type) {
            case "educationProgramme":
                req.education_programme = req.education_programme || {};
                req.education_programme.error = error.message;
                break;
            case "programmaLines":
                req.programme_lines = req.programme_lines || {};
                req.programme_lines.error = error.message;
                break;
            case "courses":
                req.courses = req.courses || {};
                req.courses.error = error.message;
                break;
            case "classes":
                req.classes = req.classes || {};
                req.classes.error = error.message;
                break;
            default: 
                req.pageError = error.message;
                break;
        }

        next();
    }
}
