document.addEventListener('DOMContentLoaded', () => {
    const coachSelect = document.getElementById('');
    if (coachSelect) {
        coaches.forEach(coach => {
            const option = document.createElement('option');
            option.value = coach.id;
            option.textContent = coach.name;
            if (coach.id === userInfo.coach) {
                option.selected = true;
            }
            coachSelect.appendChild(option);
        });
    }

    const addWorkCoachButton = document.getElementById('addWorkCoach');
    if (addWorkCoachButton) {
        addWorkCoachButton.addEventListener('click', () => {
            const container = document.createElement('div');
            const select = document.createElement('select');
            select.name = 'workCoachIds[]';
            coaches.forEach(coach => {
                const option = document.createElement('option');
                option.value = coach.id;
                option.textContent = coach.name;
                select.appendChild(option);
            });
            container.appendChild(select);
            document.getElementById('workCoachContainer').appendChild(container);
        });
    }

    const workMentorSelect = document.getElementById('workMentor');
    if (workMentorSelect) {
        const option = document.createElement('option');
        option.value = userInfo.workMentor;
        option.textContent = userInfo.workMentor;
        workMentorSelect.appendChild(option);
        workMentorSelect.selectedIndex = 0;
    }
});
