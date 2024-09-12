const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIvalue = document.querySelector(".loan-emi .value");
const totalInterestvalue = document.querySelector(".total-interest .value");
const totalAmountvalue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;
let myChart;

const checkValues = () =>{
    let loanAmountvalue = loanAmountInput.value;
    let interestRatevalue = interestRateInput.value;
    let loanTenurevalue = loanTenureInput.value;

    let regexNumber = /^[0-9]+$/;

    if(!loanAmountvalue.match(regexNumber)){
        loanAmountInput.value = "10000";
    }

    if(!loanTenurevalue.match(regexNumber)){
        loanTenureInput.value = "12";
    }

    let regexDecimalNumber = /^(\d*\.)?\d+$/;
    if(!interestRatevalue.match(regexDecimalNumber)){
        interestRateInput.value = "7.5";
    }
};

const displayChart = (totalInterestPayablevalue) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Total Interest", "Principal Loan Amount"],
            datasets: [
                {
                    data: [totalInterestPayablevalue, loanAmount],
                    backgroundColor: ["#e63946", "#14213d"],

                    borderWidth: 0,
                },
            ],
        },
    });
};

const updateChart = (totalInterestPayablevalue) => {
    myChart.data.datasets[0].data[0] = totalInterestPayablevalue;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();
}

const calculateEMI = () => {
    checkValues();
    refreshInputValues();

    let emi = loanAmount * interest * (Math.pow(1 + interest, loanTenure) / (Math.pow(1 + interest, loanTenure) - 1));

    return emi;
};

const updateData = (emi) => {
    loanEMIvalue.innerHTML = Math.round(emi);

    let totalAmount = Math.round(loanTenure * emi);
    totalAmountvalue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round(totalAmount - loanAmount);
    totalInterestvalue.innerHTML = totalInterestPayable;

    if(myChart) {
        updateChart(totalInterestPayable);
    }
    else{
        displayChart(totalInterestPayable);
    }
};

const refreshInputValues = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    interest = interestRate / 12 / 100;
}

const init = () => {
    let emi = calculateEMI();
    updateData(emi);
};

init();

calculateBtn.addEventListener("click", init)