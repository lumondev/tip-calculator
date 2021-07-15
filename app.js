const d = document,
  $tipSelect = d.querySelectorAll(".tip"),
  $billInput = d.querySelector(".bill-input"),
  $peopleInput = d.querySelector(".people-input"),
  $resetBtn = d.querySelector("button"),
  $tipCustom = d.querySelector(".custom"),
  $errorMessage = d.querySelector(".message");

const $amount = d.getElementById("amount"),
  $total = d.getElementById("total");

const totalObj = {
  bill: 0,
  tipPercentage: 15,
  people: 0,
  tipPerPerson: 0,
};

const resetInput = (input) => {
  return (input.value = 0);
};

const calculate = () => {
  if (totalObj.bill > 0 && totalObj.tipPercentage > 0 && totalObj.people > 0) {
    let tipTotal, tipPerson, totalPerPerson;
    tipTotal = (totalObj.bill * totalObj.tipPercentage) / 100;
    tipPerson = tipTotal / totalObj.people;
    totalPerPerson = totalObj.bill / totalObj.people + tipPerson;

    $amount.textContent = tipPerson.toFixed(2);
    $total.textContent = totalPerPerson.toFixed(2);
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
    return;
  }

  $peopleInput.classList.remove("error");
  $errorMessage.textContent = "";

  totalObj.people = +e.target.value;

  calculate();
});

$resetBtn.addEventListener("click", (e) => {
  resetInput($billInput);
  resetInput($peopleInput);
  resetInput($amount);
  resetInput($total);
  $tipSelect.forEach((el) => {
    el.value == 15 ? (el.checked = true) : (el.checked = false);
  });
});

$tipCustom.addEventListener("keyup", (e) => {
  if (e.target.value !== "") {
    $tipSelect.forEach((el) => (el.checked = false));
    totalObj.tipPercentage = parseFloat(e.target.value);
  }
  calculate();
});

d.addEventListener("click", (e) => {
  if (!e.target.matches(".tip")) return;
  totalObj.tipPercentage = parseFloat(e.target.value);
  calculate();
});
