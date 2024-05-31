document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.readOnly = true;
    }

    const roleInput = document.getElementById('role');
    if (roleInput) {
        roleInput.readOnly = true;
    }
});
