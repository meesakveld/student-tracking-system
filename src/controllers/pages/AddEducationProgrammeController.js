/**
 * ------------------------------
 *  ADD EDUCATION PROGRAMME PAGE
 * ------------------------------
*/

export const addEducationProgrammePage = async (req, res) => {
    // ——— PERIODS DATA ———
    // Note that a period needs to be linked to a semester in the back end!
    // The semester options are not icluded to prevent users from selecting a period with the wrong semester.
    const periods = [
        { value: "1", label: "Periode 1" },
        { value: "2", label: "Periode 2" },
        { value: "3", label: "Periode 3" },
        { value: "4", label: "Periode 4" },
        { value: "5", label: "Periode 5" },
        { value: "6", label: "Periode 6" },
        { value: "7", label: "Periode 7" },
        { value: "8", label: "Periode 8" },
    ];

     // ——— RENDER DATA ———
    const data = {
        user: req.user,
        periods,
    };
    res.render('add-education-programme', data);
};