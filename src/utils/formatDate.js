/**
 * Formats a date string into a localized date format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });
};