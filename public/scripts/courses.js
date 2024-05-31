document.addEventListener('DOMContentLoaded', () => {
    const addCourseButton = document.getElementById('inputField');
    if (addCourseButton) {
        addCourseButton.addEventListener('click', () => {
            const container = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'courses[]';
            container.appendChild(input);
            document.getElementById('courseContainer').appendChild(container);
        });
    }

    const classSelect = document.getElementById('classId');
    if (classSelect) {
        classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.name;
            if (cls.name === userInfo.class) {
                option.selected = true;
            }
            classSelect.appendChild(option);
        });
    }
});
