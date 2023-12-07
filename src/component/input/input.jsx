import { useDispatch} from "react-redux";
import './input.css'

function Input() {

  const dispatch = useDispatch();
  const handleInput = ({ target: { value, name } }) => {
    dispatch({ type: `${name}`, payload: Number(value) });
  };

  return (
    <div className="form-group">
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        required
        placeholder="1.00"
        onChange={handleInput}
      />
    </div>
  );
}
export default Input;
