import Select from "../select/select";
import { useDispatch, useSelector } from "react-redux";

import "./form-select.css";

function FormSelect({ nameFor }) {
  const dispatch = useDispatch();
  const { from, to } = useSelector((state) => state.pair);

  function selectPair(e) {
    let value = e.target.value;
    console.log(value);
    dispatch({ type: "setPair", payload: { [nameFor]: value } });
  }
  return (
    <div className="form-select">
      <label htmlFor={nameFor}>{nameFor}</label>
      <Select
        value={nameFor === "from" ? from : to}
        selectPair={(e) => selectPair(e)}
        selectName={nameFor}
        selectId={nameFor}
        selectClass={nameFor}
      />
    </div>
  );
}
export default FormSelect;
