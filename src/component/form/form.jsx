import FormSelect from "../form-select/form-select";
import FormInfo from "../form-info/form-info";
import Input from "../input/input";

function Form() {
  return (
    <form className="form">
      <div className="form-inputs">
        <Input />
        <div className="form-selects">
          <FormSelect nameFor={"from"} />
          <div className="form-select__icon switch-currencies">
            <img src="./images/arrows.png" alt="img-arrow" />
          </div>
          <div className="form-selects">
            <FormSelect nameFor={"to"} />
          </div>
        </div>
      </div>
      <FormInfo />
      <div className="rate-information">
        <div className="rate-conversion"></div>
        <div className="rate-last"></div>
      </div>
    </form>
  );
}
export default Form;
