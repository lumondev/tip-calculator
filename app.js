//DOM Elements
const d = document,
  $tipSelect = d.querySelectorAll(".tip"),
  $billInput = d.querySelector(".bill-input"),
  $peopleInput = d.querySelector(".people-input"),
  $resetBtn = d.querySelector("button"),
  $tipCustom = d.querySelector(".custom"),
  $errorMessage = d.querySelector(".message"),
  $amount = d.getElementById("amount"),
  $total = d.getElementById("total");

//Initial state of our app
const initialObj = () => {
  return {
    bill: 0,
    tipPercentage: 15,
    people: 0,
  };
};

let totalObj = initialObj();

const resetInput = (input, prop) => {
  return (input[prop] = prop === "value" ? "" : "0.00");
};

const calculate = () => {
  if (totalObj.bill !== "" && totalObj.people > 0) {
    $resetBtn.disabled = false;
    let tipTotal, tipPerson, totalPerPerson;
    tipTotal = (totalObj.bill * totalObj.tipPercentage) / 100;
    tipPerson = tipTotal / totalObj.people;
    totalPerPerson = totalObj.bill / totalObj.people + tipPerson;

    $amount.textContent = tipPerson > 0 ? tipPerson.toFixed(2) : 0;
    $total.textContent = totalPerPerson > 0 ? totalPerPerson.toFixed(2) : 0;
  }
};

$billInput.addEventListener("keyup", (e) => {
  totalObj.bill = parseFloat(e.target.value);
  calculate();
});

$peopleInput.addEventListener("keyup", (e) => {
  if (e.target.value === "" || e.target.value == 0) {
    $peopleInput.classList.add("error");

    $amount.textContent = 0;
    $total.textContent = 0;
    $errorMessage.textContent = "Can't be zero";
    totalObj.people = 0;
    return;
  }

  $peopleInput.classList.remove("error");
  $errorMessage.textContent = "";

  totalObj.people = +e.target.value;

  calculate();
});

$resetBtn.addEventListener("click", (e) => {
  resetInput($billInput, "value");
  resetInput($peopleInput, "value");
  resetInput($tipCustom, "value");
  resetInput($amount, "textContent");
  resetInput($total, "textContent");
  $resetBtn.disabled = true;
  totalObj = initialObj();
  calculate();

  $tipSelect.forEach((el) => {
    el.value == 15 ? (el.checked = true) : (el.checked = false);
  });
});

$tipCustom.addEventListener("keyup", (e) => {
  if (e.target.value == "" || e.target.value === 0) {
    totalObj.tipPercentage = 0;
    resetInput($amount, "textContent");
    calculate();
    return;
  }

  $tipSelect.forEach((el) => (el.checked = false));
  totalObj.tipPercentage = parseFloat(e.target.value);

  calculate();
});

d.addEventListener("click", (e) => {
  if (!e.target.matches(".tip")) return;
  totalObj.tipPercentage = +e.target.value;
  calculate();
});
