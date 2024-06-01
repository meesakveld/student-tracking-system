const hideItems = document.querySelectorAll('.hide');
const editCommentButton = document.querySelector('#editComment');
const textarea = document.querySelector('#commentTextArea');

const switchVisibility = () => {
    hideItems.forEach(item => {
        item.classList.remove('hidden');
        item.removeAttribute('disabled');
    });
    editCommentButton.classList.toggle('hidden');
    textarea.removeAttribute('disabled');
};

const commentEditHandler = () => {

    // Add event listener to the edit button
    editCommentButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        switchVisibility();
    });

    // If there is a flash message, show the edit form
    const flash = document.querySelector('.page__error');
    if (flash) {
        switchVisibility();
    }

};

commentEditHandler();