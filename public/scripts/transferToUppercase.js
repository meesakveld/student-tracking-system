/**
 * Converts the input value of a specified element to uppercase.
 * @param {string} str - The CSS selector of the element.
 */
const transferToUppercase = (str) => {
    const element = document.querySelector(str);

    if (!element) {
        console.error(`Element with selector ${str} not found.`);
        return;
    }

    element.addEventListener('keyup', (ev) => {
        ev.target.value = ev.target.value.toUpperCase();
    });
}

// Add education programme
transferToUppercase("#code")

