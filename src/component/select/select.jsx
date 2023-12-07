import {  useSelector } from "react-redux";
import './select.css'


export default function Select({ selectId, selectName, selectPair, value }) {
 
	
	const currencies = useSelector((state) => state.currencies);
  return (
    <select
      name={selectName}
      className="select"
      id={selectId}
      onChange={selectPair}
      value={value}
    >
      <option value="" hidden>
        Choose currency
      </option>
      {currencies.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}
