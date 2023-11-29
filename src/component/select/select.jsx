import { useDispatch, useSelector } from "react-redux";



export default function Select({ SelectId, selectName }) {
  return (
    <select
      name={selectName ? selectName : "name"}
      className="select"
      id={SelectId}
    >
      <option value=""  hidden>
        Choose currency
      </option>
    </select>
  );
}
