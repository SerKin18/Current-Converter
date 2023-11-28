import Button from "../button/button";
import Select from "../select/select";

export default function SinglePage() {
  return (
    <div className="content show " data-child="single">
      <div className="currency-wrapper">
        <div className="currency-single">
          <Select SelectId={"singleSelect"} />
          <div className="currency-single__item"></div>
        </div>
        <div className="currency-list"></div>
      </div>
      <div className="currency-add">
        <Button className={"currency-add__button"} itemName={"Add currency"} />
        <Select SelectId={"AddCurrencySelect"} />
      </div>
    </div>
  );
}
