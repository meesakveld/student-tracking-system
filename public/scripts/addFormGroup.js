function addProgrammeLine() {
    const $programmeLines = document.getElementById('programmeLines');
    const $alreadyExistingProgrammeLines = document.querySelectorAll('.programmeLine');
    const id = $alreadyExistingProgrammeLines.length;

    const programmeLineDiv = document.createElement('div');
    programmeLineDiv.id = `programme_line_${id}`;
    programmeLineDiv.classList.add('programmeLine');

    const lineHR = document.createElement('hr');
    lineHR.classList.add('add-programme__line');

    const outerGroupDiv = document.createElement('div');
    outerGroupDiv.classList.add('add-programme__group');

    const nameLabel = document.createElement('p');
    nameLabel.classList.add('semibold');
    nameLabel.textContent = 'Naam van de programmalijn*';

    const inputField1 = document.createElement('div');
    inputField1.classList.add('input-field');

    const nameInput = document.createElement('input');
    nameInput.name = `programme_line_${id}-name`;
    nameInput.classList.add('input-field__input');
    nameInput.placeholder = 'Business Communication';

    inputField1.appendChild(nameInput);
    outerGroupDiv.appendChild(nameLabel);
    outerGroupDiv.appendChild(inputField1);

    const innerGroupsDiv = document.createElement('div');
    innerGroupsDiv.classList.add('add-programme__groups');

    const descriptionGroup = document.createElement('div');
    descriptionGroup.classList.add('add-programme__group');

    const descriptionLabel = document.createElement('p');
    descriptionLabel.classList.add('semibold');
    descriptionLabel.textContent = 'Beschrijving';

    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.name = `programme_line_${id}-description`;

    descriptionGroup.appendChild(descriptionLabel);
    descriptionGroup.appendChild(descriptionTextarea);

    const studyPointsGroup = document.createElement('div');
    studyPointsGroup.classList.add('add-programme__group');

    const studyPointsLabel = document.createElement('p');
    studyPointsLabel.classList.add('semibold');
    studyPointsLabel.textContent = 'Studiepunten*';

    const studyPointsInputField = document.createElement('div');
    studyPointsInputField.classList.add('input-field');

    const studyPointsInput = document.createElement('input');
    studyPointsInput.name = `programme_line_${id}-study_points`;
    studyPointsInput.classList.add('input-field__input');
    studyPointsInput.type = 'number';
    studyPointsInput.placeholder = '15';

    studyPointsInputField.appendChild(studyPointsInput);
    studyPointsGroup.appendChild(studyPointsLabel);
    studyPointsGroup.appendChild(studyPointsInputField);

    innerGroupsDiv.appendChild(descriptionGroup);
    innerGroupsDiv.appendChild(studyPointsGroup);

    programmeLineDiv.appendChild(lineHR);
    programmeLineDiv.appendChild(outerGroupDiv);
    programmeLineDiv.appendChild(innerGroupsDiv);

    $programmeLines.appendChild(programmeLineDiv);
}


function addCourse() {
    const $courses = document.getElementById('courses');
    const $alreadyExistingCourses = document.querySelectorAll('.course');
    const id = $alreadyExistingCourses.length;

    const courseDiv = document.createElement('div');
    courseDiv.id = `course_${id}`;
    courseDiv.classList.add('course');

    const lineHR = document.createElement('hr');
    lineHR.classList.add('add-programme__line');

    const outerGroupDiv = document.createElement('div');
    outerGroupDiv.classList.add('add-programme__group');

    const nameLabel = document.createElement('p');
    nameLabel.classList.add('semibold');
    nameLabel.textContent = 'Naam van het vak*';

    const inputField1 = document.createElement('div');
    inputField1.classList.add('input-field');

    const nameInput = document.createElement('input');
    nameInput.name = `course_${id}-name`;
    nameInput.classList.add('input-field__input');
    nameInput.type = 'text';
    nameInput.placeholder = 'IT Professional';

    inputField1.appendChild(nameInput);
    outerGroupDiv.appendChild(nameLabel);
    outerGroupDiv.appendChild(inputField1);

    const innerGroupsDiv = document.createElement('div');
    innerGroupsDiv.classList.add('add-programme__groups');

    const descriptionGroup = document.createElement('div');
    descriptionGroup.classList.add('add-programme__group');

    const descriptionLabel = document.createElement('p');
    descriptionLabel.classList.add('semibold');
    descriptionLabel.textContent = 'Beschrijving';

    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.name = `course_${id}-description`;

    descriptionGroup.appendChild(descriptionLabel);
    descriptionGroup.appendChild(descriptionTextarea);

    const periodGroup = document.createElement('div');
    periodGroup.classList.add('add-programme__group');

    const periodLabel = document.createElement('p');
    periodLabel.classList.add('semibold');
    periodLabel.textContent = 'Periode*';

    const periodDropdown = document.createElement('div');
    periodDropdown.classList.add('dropdown', 'filter');

    const periodSelect = document.createElement('select');
    periodSelect.name = `course_${id}-period`;

    const periods = ["Periode 1", "Periode 2", "Periode 3", "Periode 4", "Periode 5", "Periode 6", "Periode 7", "Periode 8"];

    periods.forEach((period, index) => {
        const option = document.createElement('option');
        option.value = `${index+1}-${(index % 2) + 1}`;
        option.textContent = period;
        periodSelect.appendChild(option);
    });

    periodDropdown.appendChild(periodSelect);
    periodGroup.appendChild(periodLabel);
    periodGroup.appendChild(periodDropdown);

    const studyPointsGroup = document.createElement('div');
    studyPointsGroup.classList.add('add-programme__group');

    const studyPointsLabel = document.createElement('p');
    studyPointsLabel.classList.add('semibold');
    studyPointsLabel.textContent = 'Studiepunten*';

    const studyPointsInputField = document.createElement('div');
    studyPointsInputField.classList.add('input-field');

    const studyPointsInput = document.createElement('input');
    studyPointsInput.name = `course_${id}-study_points`;
    studyPointsInput.classList.add('input-field__input');
    studyPointsInput.type = 'number';
    studyPointsInput.placeholder = '2';

    studyPointsInputField.appendChild(studyPointsInput);
    studyPointsGroup.appendChild(studyPointsLabel);
    studyPointsGroup.appendChild(studyPointsInputField);

    const contactHoursGroup = document.createElement('div');
    contactHoursGroup.classList.add('add-programme__group');

    const contactHoursLabel = document.createElement('p');
    contactHoursLabel.classList.add('semibold');
    contactHoursLabel.textContent = 'Contacturen*';

    const contactHoursInputField = document.createElement('div');
    contactHoursInputField.classList.add('input-field');

    const contactHoursInput = document.createElement('input');
    contactHoursInput.name = `course_${id}-contact_hours`;
    contactHoursInput.classList.add('input-field__input');
    contactHoursInput.type = 'number';
    contactHoursInput.placeholder = '5';

    contactHoursInputField.appendChild(contactHoursInput);
    contactHoursGroup.appendChild(contactHoursLabel);
    contactHoursGroup.appendChild(contactHoursInputField);
    
    const studyPointsContactHoursGroup = document.createElement('div');
    studyPointsContactHoursGroup.appendChild(studyPointsGroup);
    studyPointsContactHoursGroup.appendChild(contactHoursGroup);
    
    innerGroupsDiv.appendChild(descriptionGroup);
    innerGroupsDiv.appendChild(studyPointsContactHoursGroup);
    innerGroupsDiv.appendChild(periodGroup);


    courseDiv.appendChild(lineHR);
    courseDiv.appendChild(outerGroupDiv);
    courseDiv.appendChild(innerGroupsDiv);

    $courses.appendChild(courseDiv);
}


function addClass() {
    const $classes = document.getElementById('classes');
    const $alreadyExistingClasses = document.querySelectorAll('.class');
    const id = $alreadyExistingClasses.length;

    const lineHR = document.createElement('hr');
    lineHR.classList.add('add-programme__line');

    const classDiv = document.createElement('div');
    classDiv.classList.add('add-programme__group', 'class');
    classDiv.id = `class_${id}`;

    const paragraph = document.createElement('p');
    paragraph.classList.add('semibold');
    paragraph.textContent = 'Naam van de klas*';

    const inputField = document.createElement('div');
    inputField.classList.add('input-field');

    const input = document.createElement('input');
    input.name = `class_${id}-name`;
    input.classList.add('input-field__input');
    input.type = 'text';
    input.placeholder = '1-PGM-A';

    inputField.appendChild(input);

    classDiv.appendChild(lineHR);
    classDiv.appendChild(paragraph);
    classDiv.appendChild(inputField);

    $classes.appendChild(classDiv);
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