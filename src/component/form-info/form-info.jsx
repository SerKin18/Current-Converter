import Button from "../button/button";

function FormInfo() {
  return (
    <div className="form-info">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="form-results">
        <div className="form-result__item from" id="resultFrom"></div>
        <div className="form-result__equals">
          <img src="./images/equals.svg" alt="img-equals" />
        </div>
        <div className="form-result__item to" id="resultTo"></div>
      </div>
      <Button className={"form-submit"} itemName={"Convert"}/>
    </div>
  );
}
export default FormInfo