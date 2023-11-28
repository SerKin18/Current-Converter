export default function Select({ SelectId, selectName }) {
  return (
    <select
      name={selectName ? selectName : "name"}
      className="select"
      id={SelectId}
    >
      <option value="" disabled hidden>
        Choose currency
      </option>
    </select>
  );
}
