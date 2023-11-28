

function Tabs() {
	return (
		<div className="tabs">
			<div className="tab active" data-tab="convert">
				<div className="tab-icon">
					<img src="./images/convert.svg" alt="img-convert" />
				</div>
				<div className="tab-title">Convert</div>
			</div>
			<div className="tab" data-tab="single">
				<div className="tab-icon">
					<img src="./images/single.svg" alt="img-single" />
				</div>
				<div className="tab-title">Single</div>
			</div>
		</div>
	)
}
export default Tabs