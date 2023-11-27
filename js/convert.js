import { renderResultForm } from "./markups.js";
import state from "./state.js";
import { convertTime, formatToCurrency, getFullTitle } from "./utils.js";
import variables from "./variables.js";

const { formResults, rateConversion, rateLast, toSelect, fromSelect } =
  variables;

export const handleChange = ({ target: { value, name } }) => {
  state.pair = {
    ...state.pair,
    [name]: value,
  };
};

export const handleInput = ({ target: { value, name } }) => {
  state[name] = Number(value);
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

  resultFrom.innerHTML = renderResultForm(from);
  resultTo.innerHTML = renderResultForm(to);

  const baseValue = formatToCurrency(baseCode, 1);
  const targetValue = formatToCurrency(targetCode, rate);

  rateConversion.innerHTML = `${baseValue}+${targetValue}`;
  rateLast.innerHTML = `Last update ${convertTime(time)}`;
  formResults.classList.add("show");
};
export const handleSubmit = async (e) => {
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

export const switchCurrencies = () => {
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
