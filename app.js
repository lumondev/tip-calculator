const d = document,
  $billInput = d.querySelector(".bill-input"),
  $peopleInput = d.querySelector(".people-input"),
  $tipSelect = d.querySelectorAll(".tip");

const totalObj = {
  bill: 0,
  tipPercentage: 15,
  people: 0,
  tipPerPerson: 0,
  tipTotal: 0,
};

$billInput.addEventListener("keyup", (e) => {
  totalObj.bill = +e.target.value;
});

$peopleInput.addEventListener("keyup", (e) => {
  totalObj.people = +e.target.value;
});

d.addEventListener("click", (e) => {
  if (!e.target.matches(".tip")) return;
});
