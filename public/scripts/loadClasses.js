const loadClasses = () => {

    const classes = document.getElementById('filterClass');
    const educationProgramme = document.getElementById('filterProgram');

    educationProgramme.addEventListener('change', async () => {
        try {
            const educationProgrammeId = educationProgramme.options[educationProgramme.selectedIndex].getAttribute('data-id');

            if (!educationProgrammeId) {
                classes.innerHTML = '<option value="">Alle klassen</option>';
                classes.setAttribute('disabled', true);
                return;
            }

            const response = await fetch(`/api/class?education_programme_id=${educationProgrammeId}`);
            const data = await response.json();

            if (!data || data.length === 0) {
                classes.innerHTML = '<option value="">Alle klassen</option>';
                classes.setAttribute('disabled', true);
                return;
            }

            const options = data.map(item => {
                return `<option value="${item.name}">${item.name}</option>`;
            });

            options.unshift('<option value="">Alle klassen</option>');

            classes.innerHTML = '';
            classes.innerHTML = options.join('');
            classes.removeAttribute('disabled');
        } catch (error) {
            classes.innerHTML = '<option value="">Alle klassen</option>';
            classes.setAttribute('disabled', true);
        }
    });

}

loadClasses()