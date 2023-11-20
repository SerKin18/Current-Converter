

const selects = document.querySelectorAll(".select"),
	inputAmount = document.getElementById("amount"),
	form = document.querySelector(".form"),
	resultFrom = document.getElementById("resultFrom"),
	resultTo = document.getElementById("resultTo"),
	formResults = document.querySelector(".form-results"),
	rateConversion = document.querySelector(".rate-conversion"),
	rateLast = document.querySelector(".rate-last"),
	switchCurrenciesButton = document.querySelector('.switch-currencies'),
	toSelect = document.getElementById('to'),
	fromSelect = document.getElementById('from'),
	tabs=document.querySelectorAll('.tab')


let state = {
	key: "23158d58a9bf65ceebb6976c",
	url: "https://v6.exchangerate-api.com/v6/",
	codes: [],
	pair: {
		from: "",
		to: "",
	},
	amount: "",
	loading: false,
	currentTab:'convert'
};

const formatToCurrency = (code, amount) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: code,
		maximumFractionDigits: 2,
	}).format(amount);
};
const convertTime = (date) => {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}
	return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}


const handleTabClick=({currentTarget:target})=>{
	const {tab}=target.dataset;

	const children=document.querySelectorAll('.content')
	if(!tab|| tab===state.currentTab) return;
	tabs.forEach((item)=>item.classList.remove('active'));
	target.classList.add('active');

	for(const child of children){
		if(child.dataset.child === tab) child.classList.add('show');
		else child.classList.remove('show')
	}
	state.currentTab = tab;
}

const switchCurrencies = () => {
	const { pair: { from, to } } = state;
	if (!to || !from) return;
	state.pair = {
		to: from,
		from: to,
	}
	toSelect.value = from;
	fromSelect.value = to;
}

const getFullTitle = (codes, code) => {
	const [, title] = codes.find((item) => item.includes(code));
	return title;
};

const insertResults = ({
	base_code: baseCode,
	target_code: targetCode,
	conversion_rate: rate,
	conversion_result: result,
	time_last_update_utc: time,
}) => {
	const from = {
		code: baseCode,
		amount: state.amount,
		full: getFullTitle(state.codes, baseCode),
	};
	const to = {
		code: targetCode,
		amount: result,
		full: getFullTitle(state.codes, targetCode),
	};
	const renderResultForm = ({ code, amount, full }) => {
		return `<div class="form-result__item-icon icon">
		<img src="./images/arrow.svg" alt="img-arrow" />
		</div>
		<div class="form-result__item-titles">
		<div class="form-result__item-title">${code}</div>
		<div class="form-result__item-full">${full}</div>
		</div>
		<div class="form-result__item-value">${amount}</div>`;
	};
	resultFrom.innerHTML = renderResultForm(from);
	resultTo.innerHTML = renderResultForm(to);

	const baseValue = formatToCurrency(baseCode, 1);
	const targetValue = formatToCurrency(targetCode, rate);

	rateConversion.innerHTML = `${baseValue}+${targetValue}`;
	rateLast.innerHTML = `Last update ${convertTime(time)}`
	formResults.classList.add("show");
};

const handleSubmit = async (e) => {
	e?.preventDefault();
	const {
		amount,
		pair: { from, to },
	} = state;
	state.loading = true;
	if (!amount || !from || !to) return;
	try {
		const response = await fetch(
			`${state.url}${state.key}/pair/${from}/${to}/${state.amount}`
		);
		const data = await response.json();
		if (data.result === "success") {
			insertResults(data);
			state.loading = false;
		}

	} catch (err) {
		console.log(err);
	}
};
const handleInput = ({ target: { value, name } }) => {
	state[name] = Number(value);
};

const handleChange = ({ target: { value, name } }) => {
	state.pair = {
		...state.pair,
		[name]: value,
	};
};

const renderCodeList = () => {
	selects.forEach((select) => {
		state.codes.forEach(([code]) => {
			const element = document.createElement("option");
			element.value = code;
			element.textContent = code;
			select.insertAdjacentElement("beforeend", element);
		});
		select.addEventListener("change", handleChange);
	});
};

const fetchCodes = async () => {
	try {
		const response = await fetch(`${state.url}${state.key}/codes`);
		const data = await response.json();
		if (data.result === "success") {
			state.codes = data.supported_codes;
			renderCodeList();
		}
	} catch (err) {
		console.log(err);
	}
};
fetchCodes();

inputAmount.addEventListener("keyup", handleInput);
form.addEventListener("submit", handleSubmit);
switchCurrenciesButton.addEventListener('click', switchCurrencies);
tabs.forEach(tab=>{
	tab.addEventListener('click',handleTabClick)
})
