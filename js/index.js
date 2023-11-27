
import variables from "./variables.js";
import state from "./state.js";
import { handleChange } from "./convert.js";
import { fetchLatest } from "./single.js";

const { selects, tabs } = variables;



const selects = document.querySelectorAll(".select"),
  inputAmount = document.getElementById("amount"),
  form = document.querySelector(".form"),
  resultFrom = document.getElementById("resultFrom"),
  resultTo = document.getElementById("resultTo"),
  formResults = document.querySelector(".form-results"),
  rateConversion = document.querySelector(".rate-conversion"),
  rateLast = document.querySelector(".rate-last"),
  switchCurrenciesButton = document.querySelector(".switch-currencies"),
  toSelect = document.getElementById("to"),
  fromSelect = document.getElementById("from"),
  tabs = document.querySelectorAll(".tab"),
  currentCurrency = document.querySelector(".currency-single__item"),
  currentCurrencyList = document.querySelector(".currency-list"),
  singleSelect = document.getElementById("singleSelect"),
  addButton = document.querySelector(".currency-add__button"),
  addCurrencySelect = document.getElementById("AddCurrencySelect");

let state = {
  key: "23158d58a9bf65ceebb6976c",
  url: "https://v6.exchangerate-api.com/v6/",
  codes: [],
  pair: {
    from: "",
    to: "",
  },
  amount: "",
  loading: false,
  currentTab: "convert",
  currency: {
    code: "USD",
  },
  currencies: ["USD", "EUR", "UAH"],
  action: {
    remove: "remove",
    change: "change",
  },
};

const insertCurrency = (data) => {
  currentCurrencyList.insertAdjacentHTML(
    "afterbegin",
    renderCurrencyItem(data)
  );
};

const insertCurrencies = () => {
  const { currency } = state;
  const { conversion_rates: rates, base_code: baseCode } = currency;

  currentCurrency.innerHTML = renderCurrencyItem(currency);
  currentCurrencyList.innerHTML = "";
  Object.entries(rates).forEach(([code, rate]) => {
    if (code == baseCode || !state.currencies.includes(code)) return;
    insertCurrency({ ...currency, code, rate });
  });
};

const fetchLatest = async () => {
  const {
    url,
    currency: { code },
  } = state;
  if (!code) return;
  try {
    const response = await fetch(`${url}${state.key}latest/${code}`);
    const data = await response.json();
    if (data.result === "success") {
      state.currency = { ...state.currency, ...data };
      insertCurrencies();
    }
  } catch (err) {
    console.log(err);
  }
};

const formatToCurrency = (code, amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 2,
  }).format(amount);
};
const convertTime = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
const removeCurrency = (target) => {
  const parent = target.parentElement.parentElement;

  const { item } = parent.dataset;
  if (!item) return;
  const element = document.querySelector(`[data-item="${item}"]`);
  element.remove();
};

const handleAddSelectChange = ({ target }) => {
  const {
    currency: { conversion_rates: rates, base_code: baseCode },
  } = state;
  const currency = Object.entries(rates).find(
    ([key]) => key === target.value && key !== baseCode
  );

  if (currency) {
    const [code, amount] = currency;
    insertCurrency({ ...state.currency, code, rate: amount });
  }

  target.parentElement.classList.remove("active");
  target.value = "";
};

const addCurrency = ({ currentTarget }) => {
  currentTarget.parentElement.classList.add("active");
};

const changeCurrency = () => {
  currentCurrency.parentElement.classList.add("active");
};

const handleSingleSelectChange = ({ target }) => {
  target.parentElement.classList.remove("active");
  state.currency = { ...state.currency, code: target.value };
  fetchLatest();
  target.value = "";
};

const handleActionClick = ({ target }) => {
  const { action } = target.dataset;
  if (!action) return;
  const {
    action: { remove },
  } = state;
  action === remove ? removeCurrency(target) : changeCurrency();
};

const handleTabClick = ({ currentTarget: target }) => {
  const { tab } = target.dataset;

  const children = document.querySelectorAll(".content");
  if (!tab || tab === state.currentTab) return;
  tabs.forEach((item) => item.classList.remove("active"));
  target.classList.add("active");

  for (const child of children) {
    if (child.dataset.child === tab) child.classList.add("show");
    else child.classList.remove("show");
  }
  state.currentTab = tab;
};

const switchCurrencies = () => {
  const {
    pair: { from, to },
  } = state;
  if (!to || !from) return;
  state.pair = {
    to: from,
    from: to,
  };
  toSelect.value = from;
  fromSelect.value = to;
};

const getFullTitle = (codes, code) => {
  const [, title] = codes.find((item) => item.includes(code));
  return title;
};

const insertResults = ({
  base_code: baseCode,
  target_code: targetCode,
  conversion_rate: rate,
  conversion_result: result,
  time_last_update_utc: time,
}) => {
  const from = {
    code: baseCode,
    amount: state.amount,
    full: getFullTitle(state.codes, baseCode),
  };
  const to = {
    code: targetCode,
    amount: result,
    full: getFullTitle(state.codes, targetCode),
  };
  const renderResultForm = ({ code, amount, full }) => {
    return `<div class="form-result__item-icon icon">
		<img src="./images/arrow.svg" alt="img-arrow" />
		</div>
		<div class="form-result__item-titles">
		<div class="form-result__item-title">${code}</div>
		<div class="form-result__item-full">${full}</div>
		</div>
		<div class="form-result__item-value">${amount}</div>`;
  };
  resultFrom.innerHTML = renderResultForm(from);
  resultTo.innerHTML = renderResultForm(to);

  const baseValue = formatToCurrency(baseCode, 1);
  const targetValue = formatToCurrency(targetCode, rate);

  rateConversion.innerHTML = `${baseValue}+${targetValue}`;
  rateLast.innerHTML = `Last update ${convertTime(time)}`;
  formResults.classList.add("show");
};

const getCurrencyItemAction = (isBase) => {
  const {
    action: { remove, change },
  } = state;
  const actionName = isBase ? change : remove;
  return `
			<button data-action="${actionName}" class="currency-${actionName} currency-button">
			${actionName}
			</button>`;
};

function renderCurrencyItem({ code, base_code: baseCode, rate = 1 }) {
  const isBase = code === baseCode;

  const action = getCurrencyItemAction(isBase);
  const full = getFullTitle(state.codes, code);
  return `
			<div class="currency-item ${isBase ? "currency-current" : ""}"
			data-item="${code}">
				<div class="currency-titles">
					<div class="currency-title">${code}</div>
					<div class="currency-full">${full}</div>
				</div>
				<div class="currency-amount">${rate.toFixed(2)}</div>
				<div class="currency-action">	${action}</div>
			</div>`;
}

const handleSubmit = async (e) => {
  e?.preventDefault();
  const {
    amount,
    pair: { from, to },
  } = state;
  state.loading = true;
  if (!amount || !from || !to) return;
  try {
    const response = await fetch(
      `${state.url}${state.key}/pair/${from}/${to}/${state.amount}`
    );
    const data = await response.json();
    if (data.result === "success") {
      insertResults(data);
      state.loading = false;
    }
  } catch (err) {
    console.log(err);
  }
};
const handleInput = ({ target: { value, name } }) => {
  state[name] = Number(value);
};

const handleChange = ({ target: { value, name } }) => {
  state.pair = {
    ...state.pair,
    [name]: value,
  };
};
>>>>>>> b9db00a4292382b87adfda543e188d342639f2d7

const renderCodeList = () => {
  selects.forEach((select) => {
    state.codes.forEach(([code]) => {
      const element = document.createElement("option");
      element.value = code;
      element.textContent = code;
      select.insertAdjacentElement("beforeend", element);
    });
    const name = select.getAttribute("name");
    name && select.addEventListener("change", handleChange);
  });
};

export const fetchCodes = async () => {
  try {
    const response = await fetch(`${state.url}${state.key}/codes`);
    const data = await response.json();
    if (data.result === "success") {
      state.codes = data.supported_codes;
      renderCodeList();
      fetchLatest();
    }
  } catch (err) {
    console.log(err);
  }
};
export const handleTabClick = ({ currentTarget: target }) => {
  const { tab } = target.dataset;
  const children = document.querySelectorAll(".content");
  if (!tab || tab === state.currentTab) return;
  tabs.forEach((item) => item.classList.remove("active"));
  target.classList.add("active");

  for (const child of children) {
    if (child.dataset.child === tab) child.classList.add("show");
    else child.classList.remove("show");
  }
  state.currentTab = tab;
};
