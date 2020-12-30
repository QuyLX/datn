export const basedInput = [
    {
        id: "name",
        labelName: "Name",
        type: "input"
    },
    {
        id: "icon",
        labelName: "Icon",
        type: "input"
    },
    {
        id: "code",
        labelName: "Code",
        type: "input"
    },
    {
        id: "description",
        labelName: "Description",
        type: "textarea"
    },
    {
        id: "google-mapping",
        labelName: "Google Mapping",
        type: "input"
    },
    {
        labelName: "Checkbox",
        type: "checkbox",
        children: [
            { id: "checkbox1", value: "option1", name: "one" },
            { id: "checkbox2", value: "option2", name: "two" },
            { id: "checkbox3", value: "option3", name: "three" },
        ]
    },
    {
        labelName: "File",
        type: "file",
        id: "file",
    },
    {
        labelName: "Select",
        type: "select",
        id: "select",
        children: [
            { value: "option1", name: "one" },
            { value: "option2", name: "two" },
            { value: "option3", name: "three" },
        ]
    }
];