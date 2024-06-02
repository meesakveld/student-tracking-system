import { body } from "express-validator";

export default [
    body("comment")
        .notEmpty()
        .withMessage("Een verslag mag niet leeg zijn.")
        .bail()
        .isLength({ min: 5 })
        .withMessage("Verslag moet minimaal 5 tekens bevatten.")
        .bail(),
        
    body("visible_to_student")
        .notEmpty()
        .withMessage("Je moet aangeven of het verslag zichtbaar is voor de student.")
        .bail()
        .isIn(["0", "1"])
        .withMessage("Zichtbaarheid moet 0 of 1 zijn.")
        .bail(),

    body("tag")
        .notEmpty()
        .withMessage("Tag is verplicht.")
        .bail()
        .isIn(["course", "personal", "coaching"])
        .withMessage("Ongeldige tag.")
        .bail()
]