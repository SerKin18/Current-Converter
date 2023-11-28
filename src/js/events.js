import { handleInput, handleSubmit, switchCurrencies } from "./convert.js";
import { fetchCodes, handleTabClick } from "./index.js";
import {
  addCurrency,
  handleActionClick,
  handleAddSelectChange,
  handleSingleSelectChange,
} from "./single.js";
import variables from "./variables.js";

const {
  tabs,
  form,
  inputAmount,
  switchCurrenciesButton,
  currentCurrency,
  currentCurrencyList,
  singleSelect,
  addButton,
  addCurrencySelect,
} = variables;

fetchCodes();
inputAmount.addEventListener("keyup", handleInput);
form.addEventListener("submit", handleSubmit);
switchCurrenciesButton.addEventListener("click", switchCurrencies);
tabs.forEach((tab) => {
  tab.addEventListener("click", handleTabClick);
});
currentCurrency.addEventListener("click", handleActionClick),
  currentCurrencyList.addEventListener("click", handleActionClick),
  singleSelect.addEventListener("change", handleSingleSelectChange),
  addButton.addEventListener("click", addCurrency),
  addCurrencySelect.addEventListener("change", handleAddSelectChange);
