function addProgrammeLine() {

    const $programmeLines = document.getElementById('programmLines');
    const $alreadyExistingProgrammeLines = document.querySelectorAll('.programmeLine');
    const id = $alreadyExistingProgrammeLines.length;

    const programmeLineTemplate = `
        <hr class="add-programme__line">

        <div id="programme_line_${id}" class="programmeLine">
            <div class="add-programme__group">
                <p class="semibold">Naam van de programmalijn</p>
                <div class="input-field">
                    <input name="programme_line_${id}-name" class="input-field__input" placeholder="Business Communication">
                </div>
            </div>
            <div class="add-programme__groups">
                <div class="add-programme__group">
                    <p class="semibold">Beschrijving</p>
                    <textarea name="programme_line_${id}-description"></textarea>
                </div>
                <div class="add-programme__group">
                    <p class="semibold">Studiepunten</p>
                    <div class="input-field">
                        <input name="programme_line_${id}-study_points" class="input-field__input" type="number" placeholder="15">
                    </div>
                </div>
            </div>
        </div>
    `;

    $programmeLines.innerHTML += programmeLineTemplate;
}

function addCourse() {

    const $courses = document.getElementById('courses');
    const $alreadyExistingCourses = document.querySelectorAll('.course');
    const id = $alreadyExistingCourses.length;

    const courseTemplate = `
        <hr class="add-programme__line">
        <div id="course_${id}" class="course">
            <div class="add-programme__group">
                <p class="semibold">Naam van het vak</p>
                <div class="input-field">
                    <input name="course_${id}-name" class="input-field__input" type="text" placeholder="IT Professional">
                </div>
            </div>
            <div class="add-programme__groups">
                <div class="add-programme__group">
                    <div class="add-programme__group">
                        <p class="semibold">Beschrijving</p>
                        <textarea name="course_${id}-description"></textarea>
                    </div>
                    <div class="add-programme__group">
                        <p class="semibold">Periode</p>
                        <div class="dropdown filter">
                            <select name="course_${id}-period">
                                <option value="1-1">Periode 1</option>
                                <option value="2-1">Periode 2</option>
                                <option value="3-2">Periode 3</option>
                                <option value="4-2">Periode 4</option>
                                <option value="5-1">Periode 5</option>
                                <option value="6-1">Periode 6</option>
                                <option value="7-2">Periode 7</option>
                                <option value="8-2">Periode 8</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="add-programme__group">
                    <div class="add-programme__group">
                        <p class="semibold">Studiepunten</p>
                        <div class="input-field">
                            <input name="course_${id}-study_points" class="input-field__input" type="number" placeholder="2">
                        </div>
                    </div>
                    <div class="add-programme__group">
                        <p class="semibold">Contacturen</p>
                        <div class="input-field">
                            <input name="course_${id}-contact_hours" class="input-field__input" type="number" placeholder="5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $courses.innerHTML += courseTemplate;
}

function addClass() {

    const $classes = document.getElementById('classes');
    const $alreadyExistingClasses = document.querySelectorAll('.class');
    const id = $alreadyExistingClasses.length;

    const classTemplate = `
        <hr class="add-programme__line">
        <div class="add-programme__group class" id="class_${id}">
            <p class="semibold">Naam van de klas</p>
            <div class="input-field">
                <input name="class_${id}-name" class="input-field__input" type="text" placeholder="1-PGM-A">
            </div>
        </div>
    `;
    
    $classes.innerHTML += classTemplate;
}


const activateFunctions = () => {
    document.getElementById('addProgrammeLine').addEventListener('click', (event) => {
        event.preventDefault();
        addProgrammeLine();
    });

    document.getElementById('addCourse').addEventListener('click', (event) => {
        event.preventDefault();
        addCourse();
    });

    document.getElementById('addClass').addEventListener('click', (event) => {
        event.preventDefault();
        addClass();
    });
}

activateFunctions();