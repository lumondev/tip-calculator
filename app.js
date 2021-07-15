const d = document,
  $tipSelect = d.querySelectorAll(".tip"),
  $billInput = d.querySelector(".bill-input"),
  $peopleInput = d.querySelector(".people-input"),
  $resetBtn = d.querySelector("button"),
  $tipCustom = d.querySelector(".custom");

const $amount = d.getElementById("amount"),
  $total = d.getElementById("total");

const totalObj = {
  bill: 0,
  tipPercentage: 15,
  people: 0,
  tipPerPerson: 0,
  tipTotal: 0,
};

const resetInput = (input) => {
  return (input.value = 0);
};

const createMessage = (message) => {
  const $span = d.createElement("span");
  $span.textContent = message;
  $span.classList.add("error-message");
  return $span;
};

$billInput.addEventListener("keyup", (e) => {
  totalObj.bill = parseInt(e.target.value);
});

$peopleInput.addEventListener("keyup", (e) => {
  const $span = createMessage("Can't be zero");
  if (e.target.value === "") {
    $peopleInput.classList.add("error");
    $peopleInput.insertAdjacentElement("beforebegin", $span);
    $amount.textContent = 0;
    $total.textContent = 0;
    return;
  }

  $peopleInput.classList.remove("error");
  $span.textContent = "";
  
  totalObj.people = +e.target.value;
  totalObj.tipTotal = (totalObj.bill / totalObj.tipPercentage).toFixed(2);
  totalObj.tipPerPerson = (totalObj.tipTotal / totalObj.people).toFixed(2);

  $amount.textContent = totalObj.tipPerPerson;
  $total.textContent = totalObj.tipTotal;
});

$resetBtn.addEventListener("click", (e) => {
  // resetInput($billInput);
  // resetInput($peopleInput);
  // $tipSelect.forEach((el) => {
  //   el.value == 15 ? (el.checked = true) : (el.checked = false);
  // });
  console.log(totalObj);
});

$tipCustom.addEventListener("keyup", (e) => {
  if (e.target.value !== "") {
    $tipSelect.forEach((el) => (el.checked = false));
    totalObj.tipPercentage = parseInt(e.target.value);
  }
});

d.addEventListener("click", (e) => {
  if (!e.target.matches(".tip")) return;
  totalObj.tipPercentage = parseInt(e.target.value);
});
