import "./tabs.css";
import { useDispatch, useSelector } from "react-redux";

function Tabs() {
  const dispatch = useDispatch();
  const stateTabs = useSelector((state) => state.currentTab);
  console.log(stateTabs);

  const handleTabClick = (e) => {
    // console.log(e.target.dataset);
    const tab = e.target.closest("[data-tab]").dataset.tab;
    const tabs = document.querySelectorAll(".tab");
    const children = document.querySelectorAll(".content");
    if (!tab || tab == stateTabs) return;
    tabs.forEach((item) => item.classList.remove("active"));
    e.target.closest("[data-tab]").classList.add("active");
    for (const child of children) {
      if (child.dataset.child === tab) child.classList.add("show");
      else child.classList.remove("show");
    }
    // state.currentTab = tab;
    dispatch({ type: "currentTab", payload: tab });
  };

  return (
    <div className="tabs">
      <div className="tab active" data-tab="convert">
        <div className="tab-icon">
          <img src="./images/convert.svg" alt="img-convert" />
        </div>
        <div className="tab-title" onClick={(e) => handleTabClick(e)}>
          Convert
        </div>
      </div>
      <div className="tab" data-tab="single">
        <div className="tab-icon">
          <img src="./images/single.svg" alt="img-single" />
        </div>
        <div className="tab-title" onClick={(e) => handleTabClick(e)}>
          Single
        </div>
      </div>
    </div>
  );
}
export default Tabs;
