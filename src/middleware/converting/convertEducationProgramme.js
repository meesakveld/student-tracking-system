export const convertEducationProgramme = async (req, res, next) => {
    const inputData = req.body;

    let outputData = {
        educationProgramme: {
            title: inputData['education_programme-title'] || undefined,
            slug: inputData['education_programme-title'] ? inputData['education_programme-title'].toLowerCase().replace(/ /g, '-') : undefined,
            academic_year: inputData['education_programme-academic_year'] || undefined,
            code: inputData['education_programme-code'] || undefined
        },
        programmaLines: [],
        courses: [],
        classes: []
    };

    // Programme lines
    let programmeLinesIndex = 0;
    while (inputData.hasOwnProperty(`programme_line_${programmeLinesIndex}-name`)) {
        outputData.programmaLines.push({
            name: inputData[`programme_line_${programmeLinesIndex}-name`] || undefined,
            slug: inputData[`programme_line_${programmeLinesIndex}-name`] ? inputData[`programme_line_${programmeLinesIndex}-name`].toLowerCase().replace(/ /g, '-') : undefined,
            description: inputData[`programme_line_${programmeLinesIndex}-description`] || undefined,
            study_points: parseInt(inputData[`programme_line_${programmeLinesIndex}-study_points`]) || undefined
        });
        programmeLinesIndex++;
    }

    // Courses
    let courseIndex = 0;
    while (inputData.hasOwnProperty(`course_${courseIndex}-name`)) {
        let periodSemester = inputData[`course_${courseIndex}-period`] ? inputData[`course_${courseIndex}-period`].split('-') : ['1', '1'];
        let period = parseInt(periodSemester[0]) || null;
        let semester = parseInt(periodSemester[1]) || null;

        outputData.courses.push({
            name: inputData[`course_${courseIndex}-name`] || '',
            description: inputData[`course_${courseIndex}-description`] || '',
            period: period,
            semester: semester,
            study_points: parseInt(inputData[`course_${courseIndex}-study_points`]) || null,
            contact_hours: parseInt(inputData[`course_${courseIndex}-contact_hours`]) || null
        });
        courseIndex++;
    }

    // Classes
    let classIndex = 0;
    while (inputData.hasOwnProperty(`class_${classIndex}-name`)) {
        outputData.classes.push({
            name: inputData[`class_${classIndex}-name`] || ''
        });
        classIndex++;
    }

    req.data = outputData;

    return next();
}