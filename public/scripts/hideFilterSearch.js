const hideFilterSearch = () => {

    const $btn = document.querySelector('#search');
    $btn.setAttribute('disabled', 'disabled');

    const $filterAcademicYear = document.querySelector('#filterAcademicYear');
    const $filterProgram = document.querySelector('#filterProgram');
    const $filterCourse = document.querySelector('#filterCourse');
    $filterCourse.addEventListener('change', () => {
        if ($filterCourse.value !== "") {
            $btn.removeAttribute('disabled');
        } else {
            $btn.setAttribute('disabled', 'disabled');
        }
    }) 

    $btn.addEventListener('click', (ev) => {
        // Open url with filterCourse value
        ev.preventDefault();
        const url = `/add-attendances?filterCourse=${$filterCourse.value}&filterProgramme=${$filterProgram.value}&filterAcademicYear=${$filterAcademicYear.value}`;
        window.open(url, '_self');
    });
}

hideFilterSearch();