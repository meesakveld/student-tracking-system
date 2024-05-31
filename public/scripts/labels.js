document.addEventListener('DOMContentLoaded', () => {
    const addLabelButton = document.getElementById('.label');
    if (addLabelButton) {
        addLabelButton.addEventListener('click', () => {
            const container = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'labels[]';
            container.appendChild(input);
            document.getElementById('labelContainer').appendChild(container);
        });
    }
});
