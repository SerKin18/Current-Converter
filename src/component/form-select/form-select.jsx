import Select from "../select/select"
import { useDispatch, useSelector } from "react-redux";


function FormSelect({nameFor}) {
	return (
		<div className="form-select">
			<label htmlFor={nameFor}>{nameFor}</label>
			<Select selectName={nameFor} SelectId={nameFor}/>
		</div>
	)
}
export default FormSelect