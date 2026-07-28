let formcontainer = document.getElementById("form-container")
let addfieldbtn = document.getElementById("add-field")
let fields = []

addfieldbtn.addEventListener("click", (e) => {
    let fields = collectFieldData()
    createFields(fields)
})

function collectFieldData() {
    let elements = prompt("How Many Element You Get?");

    for (let i = 0; i < elements; i++) {
        let fieldDetail = prompt(` ${i+1} Enter Field Type and Label\nExample : text,Name `);
        let fieldarr = fieldDetail.split(",");

        if (fieldarr[0] === "radio" || fieldarr[0] === "checkbox") {

            let otherDetail = prompt(
                "Enter Name and Value\nExample : gender,male"
            );
            console.log(otherDetail)
            let otherArr = otherDetail.split(",");
            console.log(otherArr)
            let fieldobj = {
                type: fieldarr[0],
                label: fieldarr[1],
                name: otherArr[0],
                value: otherArr[1]
            };

            fields.push(fieldobj);
            console.log(fields)
        } else {
            let fieldobj = {
                type: fieldarr[0],
                label: fieldarr[1]
            };

            fields.push(fieldobj);
        }
    }

    console.log(fields);
    return fields;
}
function createFields(fields) {
    let form = document.createElement("form");
    fields.forEach(field => {

        let input = document.createElement("input");
        input.type = field.type;

        if (field.type === "radio" || field.type === "checkbox") {
            input.name = field.name;
            input.value = field.value;
        }

        let label = document.createElement("label");
        label.textContent = field.label;

        form.append(label, input);
    });

    formcontainer.append(form);
}