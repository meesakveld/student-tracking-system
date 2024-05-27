import Class from "../../../models/Class.js"

export const getAllClasses = async (req, res) => {

    if (!req.query.education_programme_id) {
        return res.json({ errors: [{ msg: "Geen opleiding opgegeven" }] });
    }

    const classes = await Class.query()
        .joinRelated(req.query.education_programme_id && 'education_programmes')
        .where(builder => {
            if (req.query.education_programme_id) {
                builder.where('education_programme_id', req.query.education_programme_id);
            }
        })
        .select('name');
 
    if (!classes || classes.length === 0) {
        return res.json({ errors: [{ msg: "Geen klassen gevonden" }] });
    }
    
    res.json(classes);

}