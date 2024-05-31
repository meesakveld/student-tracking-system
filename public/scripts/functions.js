document.addEventListener('DOMContentLoaded', () => {
    const addFunctionButton = document.getElementById('addFunction');
    if (addFunctionButton) {
        addFunctionButton.addEventListener('click', () => {
            const container = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'functions[]';
            container.appendChild(input);
            document.getElementById('functionContainer').appendChild(container);
        });
    }
});
