const loadEducationPrograms = () => {

    const academicYear = document.getElementById('filterAcademicYear');
    academicYear.addEventListener('change', async () => {
        const academicYear = document.getElementById('filterAcademicYear').value;
        const educationProgramme = document.getElementById('filterProgram')

        if (!academicYear) {
            educationProgramme.innerHTML = '<option value="">Alle opleidingen</option>';
            educationProgramme.setAttribute('disabled', true);
            return;
        }
        
        const response = await fetch(`/api/education-programmes?academic_year=${academicYear}`);
        const data = await response.json();

        const options = data.map(program => {
            return `<option value="${program.code}">${program.title}</option>`;
        });

        options.unshift('<option value="">Alle opleidingen</option>');

        educationProgramme.innerHTML = ''
        educationProgramme.innerHTML = options.join('');
        educationProgramme.removeAttribute('disabled');
    });
};

loadEducationPrograms();