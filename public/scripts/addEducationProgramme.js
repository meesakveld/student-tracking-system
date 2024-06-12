const addEducationProgramme = () => {
    
    const $addEducationProgrammeButton = document.querySelector('#add-education-programme')
    const $filterProgramme = document.querySelector('#filterProgram')
    const $filterAcademicYear = document.querySelector('#filterAcademicYear')

    // ———— DISABLE BUTTON WHEN NO ACADEMIC YEAR IS SELECTED ————
    $filterAcademicYear.addEventListener('change', (e) => {
        if (e.target.value === "") {
            $addEducationProgrammeButton.setAttribute('disabled', 'disabled')
        }
    });

    $filterProgramme.addEventListener('change', (e) => {
        if (e.target.value !== "") {
            $addEducationProgrammeButton.attributes.removeNamedItem('disabled')
        } else {
            $addEducationProgrammeButton.setAttribute('disabled', 'disabled')
        }
    });

    // ———— ADD EDUCATION PROGRAMME ————
    $addEducationProgrammeButton.addEventListener('click', async (e) => {

        // Get data-id from the selected education programme
        const educationProgrammeId = $filterProgramme.options[$filterProgramme.selectedIndex].dataset.id

        // Fetch the education programme data
        const response = await fetch(`/api/education-programmes?id=${educationProgrammeId}&withRelation=courses`)
        const data = await response.json()

        // Create the education programme HTML
        const indexId = document.querySelectorAll('#education-programme-container').length

        const education_programme = data.map(programme => {
            return `
                <div id="education-programme-container">
                
                    <hr class="add-programme__line">

                    <div class="user-info__item">
                        <p class="input-field__input">${programme.title} — ${programme.academic_year}</p>
                        <input type="hidden" name="education_programme_${indexId}-id" value="${programme.id}">
                    </div>

                    <div class="user-info__item">
                        <p class="semibold">Vakken</p>
                        <div class="checkbox-list">
                            ${programme.courses.sort((a, b) => a.name.localeCompare(b.name)).map((course, index) => {
                                return `
                                    <div>
                                        <input type="checkbox" id="courses-${indexId}-${index}" name="courses-${indexId}" value="${course.id}">
                                        <label for="courses-${indexId}-${index}">${course.name}</label>
                                    </div>
                                `                          
                            }).join('')}
                        </div>
                    </div>

                </div>
            `
        })[0];

        // Add the education programme to the DOM
        document.querySelector('#education_programmes').innerHTML += education_programme

        // Reset the filter values
        $filterProgramme.value = ""
        $filterProgramme.setAttribute('disabled', 'disabled')
        $filterProgramme.innerHTML = '<option value="">Kies Opleiding</option>'
        $filterAcademicYear.value = ""
        $addEducationProgrammeButton.setAttribute('disabled', 'disabled')
    });

}

addEducationProgramme();