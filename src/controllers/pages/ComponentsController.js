/**
 * ------------------------------
 *        COMPONENTS PAGE
 * ------------------------------
*/

export const componentsPage = (req, res) => {
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        choiceLists: [
            {
                title: "Kies een klas:",
                name: "choice1",
                choices: [
                    { value: "choice1", label: "Class 1" },
                    { value: "choice2", label: "Class 2" },
                    { value: "choice3", label: "Class 3" }
                ]
            },
            {
                title: "Kies een klas:",
                name: "choice2",
                choices: [
                    { value: "choice1", label: "Class 1" },
                    { value: "choice2", label: "Class 2" },
                    { value: "choice3", label: "Class 3" }
                ]
            },
            {
                title: "Kies een klas:",
                name: "choice3",
                choices: [
                    { value: "choice1", label: "Class 1" },
                    { value: "choice2", label: "Class 2" },
                    { value: "choice3", label: "Class 3" }
                ]
            }
        ],
        dropdown: {
            labelText: "Kies een programmalijn",
            options: [
                { value: "vak1", label: "Programmalijn-1" },
                { value: "vak2", label: "Programmalijn-2" },
                { value: "vak3", label: "Programmalijn-3" }
            ]
        }
    };
    res.render("components", data);
};

export default componentsPage;