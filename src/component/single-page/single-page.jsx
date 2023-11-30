import Button from "../button/button";
import Select from "../select/select";

export default function SinglePage() {
  return (
    <div className="content" data-child="single">
      <div className="currency-wrapper">
        <div className="currency-single">
          <Select  selectName={'single'} selectId={"singleSelect"} />
          <div className="currency-single__item"></div>
        </div>
        <div className="currency-list"></div>
      </div>
      <div className="currency-add">
        <Button className={"currency-add__button"} itemName={"Add currency"} />
        <Select  selectName={'addCurrency'} selectId={"AddCurrencySelect"} />
      </div>
    </div>
  );
}
