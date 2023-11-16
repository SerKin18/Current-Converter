const inputValue = document.querySelector("#input"),
  buttonSubmit = document.querySelector("#button"),
  convertArea = document.querySelector("#convertNum"),
  selectSection = document.querySelector("#select");

const State = {
  value: 0,
  current: "",
  index: 0,
  convertValue: null,
};

let MyData = [];

const fetchCodes = async () => {
  try {
    const api = await fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    )
      .then((response) => response.json())
      .then((data) => data.map((item) => getData(item)));
  } catch (err) {
    console.log(err);
  }
};
fetchCodes();

inputValue.addEventListener("input", (e) => {
  if (e.target.value) {
    State.value = e.target.value;
  }
});
selectSection.addEventListener("change", (e) => {
  State.current = e.target.value;
  getIndex(e.target.value);
});

buttonSubmit.addEventListener("click", () => {
  convertArea.textContent = null;
  State.convertValue = State.value * State.index;
  convertArea.textContent = State.convertValue.toFixed(2) + " " + State.current;
});

function getData(data) {
  const Data = [
    {
      moneyName: data.txt,
      moneyType: data.cc,
      rate: data.rate,
    },
  ];
  createOptionSelect(Data);
  Data.map((item) => MyData.push(item));
}

function createOptionSelect(arr) {
  arr.map((item) => {
    let option = document.createElement("option");
    option.textContent = item.moneyName;
    option.value = item.moneyType;
    selectSection.appendChild(option);
  });
}

function getIndex(curr) {
  const itemIndex = MyData.find((item) => item.moneyType == curr);
  return (State.index = itemIndex.rate);
}
