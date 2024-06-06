export const convertUser = (req, res, next) => {

    const data = req.body;

    let outputData = {
        firstname: data['personal-firstname'] || undefined,
        lastname: data['personal-lastname'] || undefined,
        email: data['personal-email'] || undefined,
        role_id: parseInt(data['personal-role']),
        contact: {
            website: data['contact-website'],
            linkedin: data['contact-linkedin'],
            facebook: data['contact-facebook'],
        },
        labels: [],
        education_programmes: [],
        courses: [],
    }

    // Labels
    let labelIndex = 0;
    if (typeof data.labels === 'string') {
        data.labels = [data.labels];
    }
    data.labels?.forEach(label => {
        outputData.labels.push({
            id: parseInt(label)
        });
        labelIndex++;
    });


    // Education programmes
    let educationProgrammeIndex = 0;
    while (data.hasOwnProperty(`education_programme_${educationProgrammeIndex}-id`)) {
        outputData.education_programmes.push({
            id: parseInt(data[`education_programme_${educationProgrammeIndex}-id`])
        });

        // Courses
        let courseIndex = 0;
        let courses = data[`courses-${educationProgrammeIndex}`];
        if (typeof courses === 'string') {
            courses = [courses];
        }
        courses?.forEach(course => {
            outputData.courses.push({
                id: parseInt(course)
            });
            courseIndex++;
        });

        educationProgrammeIndex++;
    }


    req.data = outputData;

    return next()

}