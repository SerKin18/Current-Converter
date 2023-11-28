function Input() {
  return (
    <div className="form-group">
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        required
        placeholder="1.00"
      />
    </div>
  );
}
export default Input;
