import Button from "../button/button";

function FormInfo({resultFrom,resultTo,classFormResults}) {
  return (
    <div className="form-info">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={classFormResults}>
        <div className="form-result__item from" id="resultFrom">{resultFrom}</div>
        <div className="form-result__equals">
          <img src="../../../images/arrows.png" alt="img-equals" />
        </div>
        <div className="form-result__item to" id="resultTo">{resultTo}</div>
      </div>
      <Button className={"form-submit"} itemName={"Convert"}/>
    </div>
  );
}
export default FormInfo