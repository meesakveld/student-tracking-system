const loadCourses = () => {

    const courses = document.getElementById('filterCourse');
    const educationProgramme = document.getElementById('filterProgram');
    const academicYear = document.getElementById('filterAcademicYear');

    academicYear.addEventListener('change', async () => {
        if (!academicYear.value) {
            courses.innerHTML = '<option value="">Alle vakken</option>';
            courses.setAttribute('disabled', true);
            return;
        }
    });

    educationProgramme.addEventListener('change', async () => {
        try {
            const educationProgrammeId = educationProgramme.options[educationProgramme.selectedIndex].getAttribute('data-id');
            const employeeId = educationProgramme.getAttribute('data-employee-id');

            if (!educationProgrammeId) {
                courses.innerHTML = '<option value="">Alle cursussen</option>';
                courses.setAttribute('disabled', true);
                return;
            }

            const response = await fetch(`/api/course?education_programme_id=${educationProgrammeId}&employee_id=${employeeId}`);
            const data = await response.json();

            if (!data || data.length === 0) {
                courses.innerHTML = '<option value="">Alle cursussen</option>';
                courses.setAttribute('disabled', true);
                return;
            }

            const options = data.map(item => {
                return `<option value="${item.id}">${item.name}</option>`;
            });

            options.unshift('<option value="">Alle vakken</option>');

            courses.innerHTML = '';
            courses.innerHTML = options.join('');
            courses.removeAttribute('disabled');
        } catch (error) {
            courses.innerHTML = '<option value="">Alle vakken</option>';
            courses.setAttribute('disabled', true);
        }
    });

}

loadCourses()