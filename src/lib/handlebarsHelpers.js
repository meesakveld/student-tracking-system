import handlebarsHelpers from 'handlebars-helpers';
const handyHelpers = handlebarsHelpers();

const myHelpers = {
    includes: (array, arrayStringOfValues = '["", ""]', options) => {
        const arrayOfValues = JSON.parse(arrayStringOfValues);

        if (array.some(item => arrayOfValues.includes(item))) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
}

export default { ...handyHelpers, ...myHelpers }