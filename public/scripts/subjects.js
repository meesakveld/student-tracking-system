document.addEventListener('DOMContentLoaded', () => {
    const addSubjectButton = document.getElementById('subjectInputField');
    if (addSubjectButton) {
        addSubjectButton.addEventListener('click', () => {
            const container = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'subjects[]';
            container.appendChild(input);
            document.getElementById('subjectContainer').appendChild(container);
        });
    }
});
