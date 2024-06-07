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
        functions: [],
        education_programmes: [],
        courses: [],
    }

    // If is_active
    if (data['personal-is_active']) {
        outputData.is_active = parseInt(data['personal-is_active']);
    }

    // If contact-id
    if (data['contact-id']) {
        outputData.contact.id = parseInt(data['contact-id']);
    }

    // Account id
    if (data['personal-student_id']) {
        outputData.student_id = parseInt(data['personal-student_id']);
    }
    if (data['personal-employee_id']) {
        outputData.employee_id = parseInt(data['personal-employee_id']);
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

    // Functions
    let functionIndex = 0;
    if (typeof data.functions === 'string') {
        data.functions = [data.functions];
    }
    data.functions?.forEach(func => {
        outputData.functions.push({
            id: parseInt(func)
        });
        functionIndex++;
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