import FormSelect from "../form-select/form-select";
import FormInfo from "../form-info/form-info";
import Input from "../input/input";
import variables from "../../js/variables";
import { useDispatch, useSelector } from "react-redux";
import './form.css'

const { rateConversion, rateLast, formResults } = variables;

function Form() {
  const dispatch = useDispatch();
  const { from, to } = useSelector((state) => state.pair);
  const loading = useSelector((state) => state.loading);
  const amount = useSelector((state) => state.amount);
  const url = useSelector((state) => state.url);
  const key = useSelector((state) => state.key);
  const codes = useSelector((state) => state.codes);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    // const {
    // 	amount,
    // 	pair: { from, to },
    //  } = state;
    console.log(loading);
    dispatch({ type: "loading", payload: true });
    console.log(loading);
    if (!amount || !from || !to) return;
    try {
      const response = await fetch(`${url}${key}/pair/${from}/${to}/${amount}`);
      const data = await response.json();
      if (data.result === "success") {
        insertResults(data);
        dispatch({ case: "loading", payload: false });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getFullTitle = (codes, code) => {
    const [, title] = codes.find((item) => item.includes(code));
    return title;
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

  let resultFrom = "",
    resultTo = "",
    rateConversion = "",
    rateLast = "",
    formResults = "form-results";

  const insertResults = ({
    base_code: baseCode,
    target_code: targetCode,
    conversion_rate: rate,
    conversion_result: result,
    time_last_update_utc: time,
  }) => {
    const from = {
      code: baseCode,
      amount: amount,
      full: getFullTitle(codes, baseCode),
    };
    const to = {
      code: targetCode,
      amount: result,
      full: getFullTitle(codes, targetCode),
    };

    resultFrom = renderResultForm(from);
    resultTo = renderResultForm(to);

    const baseValue = formatToCurrency(baseCode, 1);
    const targetValue = formatToCurrency(targetCode, rate);

    rateConversion = `${baseValue}+${targetValue}`;
    rateLast = `Last update ${convertTime(time)}`;
    formResults += "show";
  };

  const switchCurrencies = () => {
    if (!to || !from) return;
    console.log(from, to);
    dispatch({
      type: "removePair",
      payload: { to: from, from: to },
    });

    console.log(from, to);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-inputs">
        <Input />
        <div className="form-selects">
          <FormSelect nameFor={"from"} />
          <div
            className="form-select__icon switch-currencies"
            onClick={switchCurrencies}
          >
            <img src="../../../images/arrows.png" alt="img-arrow" />
          </div>
          <div className="form-selects">
            <FormSelect nameFor={"to"} />
          </div>
        </div>
      </div>
      <FormInfo
        resultFrom={resultFrom}
        resultTo={resultTo}
        classFormResults={formResults}
      />
      <div className="rate-information">
        <div className="rate-conversion">{rateConversion}</div>
        <div className="rate-last">{rateLast}</div>
      </div>
    </form>
  );
}
export default Form;
