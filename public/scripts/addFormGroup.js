document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addProgrammeLine').addEventListener('click', function(event) {
        event.preventDefault();
        addProgrammeLine();
    });

    document.getElementById('addCourse').addEventListener('click', function(event) {
        event.preventDefault();
        addCourse();
    });

    document.getElementById('addClass').addEventListener('click', function(event) {
        event.preventDefault();
        addClass();
    });
});

function addProgrammeLine() {
    const programmeLineTemplate = `
        <hr class="add-programme__line">
        <div class="add-programme__group">
            <p class="semibold">Naam van de programmalijn</p>
            <div class="input-field">
                <input class="input-field__input" type="text" placeholder="Business & Communication">
            </div>
        </div>
        <div class="add-programme__groups">
            <div class="add-programme__group">
                <p class="semibold">Beschrijving</p>
                <textarea></textarea>
            </div>
            <div class="add-programme__group">
                <p class="semibold">Studiepunten</p>
                <div class="input-field">
                    <input class="input-field__input" type="number" placeholder="15">
                </div>
            </div>
        </div>
    `;
    document.getElementById('programmLines').insertAdjacentHTML('beforeend', programmeLineTemplate);
}

function addCourse() {
    const courseTemplate = `
        <hr class="add-programme__line">
        <div class="add-programme__group">
            <p class="semibold">Naam van het vak</p>
            <div class="input-field">
                <input class="input-field__input" type="text" placeholder="IT Professional">
            </div>
        </div>
        <div class="add-programme__groups">
            <div class="add-programme__group">
                <div class="add-programme__group">
                    <p class="semibold">Beschrijving</p>
                    <textarea></textarea>
                </div>
                <div class="add-programme__group">
                    <p class="semibold">Programmalijn</p>
                    <div class="dropdown filter">
                        <select>
                            <!-- Replace with your actual options -->
                            <option value="Business & Communication">Business & Communication</option>
                            <option value="Creative Design & Development">Creative Design & Development</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="add-programme__group">
                <div class="add-programme__group">
                    <p class="semibold">Studiepunten</p>
                    <div class="input-field">
                        <input class="input-field__input" type="number" placeholder="2">
                    </div>
                </div>
                <div class="add-programme__group">
                    <p class="semibold">Contacturen</p>
                    <div class="input-field">
                        <input class="input-field__input" type="number" placeholder="5">
                    </div>
                </div>
                <div class="add-programme__group">
                    <p class="semibold">Periode</p>
                    <div class="dropdown filter">
                        <select>
                            <!-- Replace with your actual options -->
                            <option value="1">Periode 1</option>
                            <option value="2">Periode 2</option>
                            <option value="3">Periode 3</option>
                            <option value="4">Periode 4</option>
                            <option value="5">Periode 5</option>
                            <option value="6">Periode 6</option>
                            <option value="7">Periode 7</option>
                            <option value="8">Periode 8</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('courses').insertAdjacentHTML('beforeend', courseTemplate);
}

function addClass() {
    const classTemplate = `
        <hr class="add-programme__line">
        <div class="add-programme__group">
            <p class="semibold">Naam van de klas (jaar-groep-klasgroep)</p>
            <div class="input-field">
                <input class="input-field__input" type="text" placeholder="1-PGM-A">
            </div>
        </div>
    `;
    document.getElementById('classes').insertAdjacentHTML('beforeend', classTemplate);
}
