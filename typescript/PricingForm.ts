import { Vehicle } from "./vehicle"; // Assuming Vehicle class is defined in vehicle.ts
import { Pricing } from "./Pricing"; // Assuming Pricing class is defined in pricing.ts
// import swal from "../js/sweetalert/typings/core";
import { generateOptionMenu } from "./optionMenu";
export class PricingForm {
    private vehicle: Vehicle;
    private pricing: Pricing;

    constructor(vehicle: Vehicle) {
        this.vehicle = vehicle;
        this.pricing = new Pricing();
        this.showPricingOptions();
    }

    private showPricingOptions(): void {
        const formContainer = document.querySelector("#form-container");
        if (!formContainer) return;

        formContainer.innerHTML = ''; // Clear previous input
        const vehicleType = this.vehicle.type;
        console.log("Vehicle Type for Pricing:", vehicleType); // Debugging line
        const prices = this.pricing.getPrices(vehicleType);
        console.log("Prices Retrieved:", prices); // Debugging line

        if (!prices) {
            // swal("Invalid vehicle type. Please enter a valid type.");
            return;
        }

        console.log("Form is being generated");
        const pricingLabel = document.createElement("h3");
        const vehicleLabel = document.createElement("h4");
        pricingLabel.textContent = "Select a Pass Plan:";
        vehicleLabel.textContent = vehicleType; // Display the vehicle type
        formContainer.appendChild(pricingLabel);
        formContainer.appendChild(vehicleLabel);

        const plans = ["Daily", "Monthly", "Yearly"];
        plans.forEach((plan, index) => {
            const planContainer = document.createElement("div");
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.id = plan;
            radioInput.name = "passPlan"; // Grouping radio buttons
            radioInput.value = plan;

            const label = document.createElement("label");
            label.htmlFor = plan;
            label.textContent = `${plan} Pass: ₹${prices[index]}`;
            planContainer.appendChild(radioInput);
            planContainer.appendChild(label);
            formContainer.appendChild(planContainer);
        });

        const submitButton = document.createElement("button");
        submitButton.textContent = "Get Pass";
        submitButton.onclick = () => this.handlePlanSelection();
        formContainer.appendChild(submitButton);
    }

    private handlePlanSelection(): void {
        const selectedPlan = document.querySelector('input[name="passPlan"]:checked') as HTMLInputElement;
        if (selectedPlan) {
            const planIndex = ["Daily", "Monthly", "Yearly"].indexOf(selectedPlan.value);
            const prices = this.pricing.getPrices(this.vehicle.type);
            if (prices) {
                this.vehicle.selectedPlan = selectedPlan.value;
                this.vehicle.passPrice = prices[planIndex];
                this.showPassDetails();
            }
        } else {
            alert("Please select a pass plan.");
        }
    }

    private showPassDetails(): void {0
        const formContainer = document.querySelector("#form-container");
        if (!formContainer) return;

        formContainer.innerHTML = ''; // Clear previous input
        const ticketSection = document.getElementById('ticketsection');
        const allEmnployees = JSON.parse(localStorage.getItem("employees")!);
        let employeeDetails = null;
        allEmnployees.some((employee : any)=>{
            if(employee.employeeId == this.vehicle.employeeId){
                employeeDetails = employee;
            }
        })

        if (ticketSection) {
            // Set the values in the ticket section
            (document.getElementById('selectedPlan') as HTMLElement).innerText = this.vehicle.selectedPlan;
            (document.getElementById('selectedPlanPricing') as HTMLElement).innerText = `₹${this.vehicle.passPrice}`;
            (document.getElementById('vehicleTypeDisplay') as HTMLElement).innerText = this.vehicle.type; // Assuming vehicle type is stored in the vehicle object
            (document.getElementById('employeeIdTicket') as HTMLElement).innerText = this.vehicle.employeeId; // Assuming vehicle type is stored in the vehicle object
            (document.getElementById('employeeName') as HTMLElement).innerText = employeeDetails!.name; // Assuming vehicle type is stored in the vehicle object
            (document.getElementById('employeeEmail') as HTMLElement).innerText = employeeDetails!.emailId; // Assuming vehicle type is stored in the vehicle object
            (document.getElementById('employeeNumber') as HTMLElement).innerText = employeeDetails!.contact; // Assuming vehicle type is stored in the vehicle object
            (document.getElementById('vehicleNameDisplay') as HTMLElement).innerText = this.vehicle.name;
            (document.getElementById('vehicleNumberDisplay')  as HTMLElement).innerText = this.vehicle.vehicleNumber;
    
            // Make the ticket section visible
            ticketSection.style.display = 'block';

            document.getElementById("print")?.addEventListener( "click" , ()=>{
                window.print(); 
            })
        }
        generateOptionMenu();
    }
}
