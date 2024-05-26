const loadEducationPrograms = () => {

    const academicYear = document.getElementById('filterAcademicYear');
    const educationProgramme = document.getElementById('filterProgram')
    
    academicYear.addEventListener('change', async () => {
        try {
            const academicYearValue = academicYear.value;
            const employeeId = educationProgramme.getAttribute('data-employee-id');

            if (!academicYearValue) {
                educationProgramme.innerHTML = '<option value="">Alle opleidingen</option>';
                educationProgramme.setAttribute('disabled', true);
                return;
            }
            
            const response = await fetch(`/api/education-programmes?academic_year=${academicYearValue}&employee_id=${employeeId !== null ? employeeId : ''}`);
            const data = await response.json();

            const options = data.map(program => {
                return `<option value="${program.code}">${program.title} - ${program.code}</option>`;
            });

            options.unshift('<option value="">Alle opleidingen</option>');

            educationProgramme.innerHTML = ''
            educationProgramme.innerHTML = options.join('');
            educationProgramme.removeAttribute('disabled');
        } catch (error) {
            educationProgramme.innerHTML = '<option value="">Alle opleidingen</option>';
            educationProgramme.setAttribute('disabled', true);
        }
    });
};

loadEducationPrograms();