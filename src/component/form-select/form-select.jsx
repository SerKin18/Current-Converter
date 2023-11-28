import Select from "../select/select"

function FormSelect({nameFor}) {
	return (
		<div className="form-select">
			<label htmlFor={nameFor}>{nameFor}</label>
			<Select selectName={nameFor} SelectId={nameFor}/>
		</div>
	)
}
export default FormSelect