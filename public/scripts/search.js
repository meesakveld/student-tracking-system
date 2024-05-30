const search = document.querySelector('.input-field__input');

const searchValue = () => {
    search.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        const users = document.querySelectorAll('.active');

        users.forEach(user => {
            const name = user.querySelector('td').textContent.toLowerCase();

            if (value === '') {
                user.style.display = 'table-row';
            } else {
                if (name.includes(value)) {
                    user.style.display = 'table-row';
                } else {
                    user.style.display = 'none';
                }
            }
        });
    });
};

searchValue();
