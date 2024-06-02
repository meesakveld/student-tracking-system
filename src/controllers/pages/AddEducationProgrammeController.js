/**
 * ------------------------------
 *  ADD EDUCATION PROGRAMME PAGE
 * ------------------------------
*/

export const addEducationProgrammePage = async (req, res) => {
    // ——— PROGRAMME LINES ———
    // Note that the programme lines showed when making a new course should be included in the options.
    const programmeLines = [
        { value: "Business & Communication", label: "Business & Communication" },
        { value: "Creative Design & Development", label: "Creative Design & Development" },
    ];

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
        programmeLines,
        periods,
    };
    res.render('add-education-programme', data);
};