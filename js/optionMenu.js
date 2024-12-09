import { EmployeeForm } from "./EmployeeForm.js";
import { VehicleForm } from "./VechileForm.js";
// import swal from "../js/sweetalert/typings/core";
const employees = [];
const vehicles = [];
export function generateOptionMenu() {
    const existingEmployeesContainer = document.querySelector("#existing_employees");
    existingEmployeesContainer.innerHTML = ''; // Clear previous content
    const existingEmployeesString = localStorage.getItem("employees");
    let existingEmployees = [];
    // Check if the value exists and is a valid JSON string
    if (existingEmployeesString) {
        try {
            existingEmployees = JSON.parse(existingEmployeesString);
            // Ensure that existingEmployees is an array
            if (!Array.isArray(existingEmployees)) {
                existingEmployees = [];
            }
        }
        catch (error) {
            console.error("Error parsing employees from localStorage:", error);
            existingEmployees = []; // Reset to an empty array on error
        }
    }
    if (existingEmployees.length > 0) {
        // Create a table element
        const table = document.createElement("table");
        table.style.width = "100%"; // Set table width
        table.style.borderCollapse = "collapse"; // Collapse borders
        // Create table header
        const headerRow = document.createElement("tr");
        const headers = ["Employee Id", "Name", "Contact Number", "Email", "Gender"]; // Add more headers as needed
        headers.forEach(headerText => {
            const headerCell = document.createElement("th");
            headerCell.textContent = headerText;
            headerCell.style.border = "1px solid #ddd"; // Add border to header cells
            headerCell.style.padding = "8px"; // Add padding to header cells
            headerCell.style.textAlign = "left"; // Align text to the left
            headerRow.appendChild(headerCell);
        });
        table.appendChild(headerRow);
        console.log(existingEmployees);
        // Create table rows for each employee
        existingEmployees.forEach((employee) => {
            const row = document.createElement("tr");
            // Create cells for each piece of employee information
            const cells = [employee.employeeId, employee.name, employee.contact, employee.emailId, employee.gender]; // Adjust based on your employee object structure
            cells.forEach(cellText => {
                const cell = document.createElement("td");
                cell.textContent = cellText;
                cell.style.border = "1px solid #ddd"; // Add border to cells
                cell.style.padding = "8px"; // Add padding to cells
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
        // Append the table to the container
        existingEmployeesContainer.appendChild(table);
    }
    else {
        const noEmployeesMessage = document.createElement("p");
        noEmployeesMessage.textContent = "No existing employees found.";
        existingEmployeesContainer.appendChild(noEmployeesMessage);
    }
    /////////////////////////   //  
    const formContainer = document.querySelector("#form-container");
    if (!formContainer)
        return;
    const inputLabel = document.createElement("h4");
    inputLabel.textContent = "Choose the option you want to perform :";
    formContainer.appendChild(inputLabel);
    const optionToAdd = ["Add Employee", "Add Vehicle"];
    optionToAdd.forEach(option => {
        const radioContainer = document.createElement("div");
        const inputField = document.createElement("input");
        inputField.type = "radio";
        inputField.id = option;
        inputField.name = "work"; // Grouping radio buttons
        inputField.value = option;
        const label = document.createElement("label");
        label.htmlFor = option;
        label.textContent = option;
        radioContainer.appendChild(inputField);
        radioContainer.appendChild(label);
        formContainer.appendChild(radioContainer);
    });
    const submitButton = document.createElement("button");
    submitButton.textContent = "Next";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        handleOptionInput();
    });
    formContainer.appendChild(submitButton);
}
function handleOptionInput() {
    const selectedOption = document.querySelector('input[name="work"]:checked');
    if (selectedOption) {
        const optionSelected = selectedOption.value;
        console.log(optionSelected);
        switch (optionSelected) {
            case "Add Employee": {
                new EmployeeForm(employees, vehicles);
                break;
            }
            case "Add Vehicle": {
                checkForEmployee();
                break;
            }
            default: {
                // swal("Choose correct option!!");
                generateOptionMenu();
            }
        }
    }
    function checkForEmployee() {
        const formContainer = document.querySelector("#form-container");
        if (!formContainer)
            return;
        formContainer.innerHTML = '';
        const inputLabel = document.createElement("h4");
        inputLabel.textContent = "Enter the employee id :";
        formContainer.appendChild(inputLabel);
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "empId";
        inputField.placeholder = "1234";
        formContainer.appendChild(inputField);
        const submitButton = document.createElement("button");
        submitButton.textContent = "Next";
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const empId = inputField.value;
            if (empId == null || empId.length == 0 || empId == '') {
                alert("Please enter valid employee id");
            }
            else {
                const existingEmployees = JSON.parse(localStorage.getItem("employees"));
                console.log(empId, existingEmployees);
                let employeeExists = false;
                existingEmployees.forEach((employee) => {
                    if (employee.employeeId === empId) {
                        employeeExists = true;
                        // If employee ID exists, proceed to VehicleForm
                        console.log(`Employee ID: ${empId} exists. Proceeding to Vehicle Form.`);
                        // swal(`Employee ID: ${empId} exists. Proceeding to Vehicle Form.`);
                        new VehicleForm(vehicles);
                    }
                });
                if (!employeeExists) {
                    // If employee ID does not exist, swal the user and show EmployeeForm
                    alert(`Employee ID: ${empId} doesn't exist. Please fill out the employee form.`);
                    new EmployeeForm(employees, vehicles);
                }
            }
        });
        formContainer.appendChild(submitButton);
    }
}
