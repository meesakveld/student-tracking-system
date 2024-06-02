import handlebarsHelpers from 'handlebars-helpers';
const handyHelpers = handlebarsHelpers();

const myHelpers = {
    includes: (array, arrayStringOfValues = '["", ""]', options) => {
        const arrayOfValues = JSON.parse(arrayStringOfValues);

        if (!array || !array.length || !arrayOfValues || !arrayOfValues.length) {
            return options.inverse(this);
        }

        if (array.some(item => arrayOfValues.includes(item))) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    checkIfRowsHasActions: function (rows, options) {
        
        if (!rows || !rows.length) {
            return options.inverse(this);
        }

        const hasOneTrue = rows.some(row => {
            if (row.infoButton || row.studentButton || row.edit?.edit || row.delete?.delete) return true
        });

        if (hasOneTrue) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
}

export default { ...handyHelpers, ...myHelpers }