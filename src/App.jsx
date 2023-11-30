import Tabs from "./component/tabs/tabs.jsx";
import ConvertPage from "./component/convert-page/convert-page.jsx";
import SinglePage from "./component/single-page/single-page.jsx";
import { createStore } from "redux";
import "./App.css";
import { Provider } from "react-redux";
import variables from "./js/variables.js";
import { useEffect } from "react";
import State from "./js/state.js";

// const action = { type: "currentTab", payload: "" };
const actions={
	currentTab:(state,action)=>({ ...state, currentTab: action.payload }),
	amount:(state,action)=>({ ...state, amount: action.payload }),
	loading:(state,action)=>({ ...state, loading: action.payload }),
	removePair:(state,action)=>({ ...state, pair: { to: action.payload.to, from: action.payload.from }}),
	setPair:(state,action)=>({ ...state, pair: { ...state.pair, ...action.payload }}),
	default:(state)=>state
}

const reducer = (state = State, action) => {
return (actions[action.type]||actions.default)(state,action)


//   switch (action.type) {
//     case "currentTab":
//       return { ...state, currentTab: action.payload };
//     case "amount":
//       return { ...state, amount: action.payload };
//     case "loading":
//       return { ...state, loading: action.payload };
//     case "removePair":
//       return {
//         ...state,
//         pair: { from: action.payload.to, to: action.payload.from },
//       };
//     case "setPair":
//       console.log(action.payload);
//       return { ...state, pair: { ...state.pair, ...action.payload } };
//     default:
//       return state;
//   }
};
const store = createStore(reducer);

const { selects } = variables;

function App() {
  //   useEffect(() => {
  //     async function fetchCode() {
  //       try {
  //         const response = await fetch(`${State.url}${State.key}/codes`);
  //         const data = await response.json();
  //         if (data.result === "success") {
  //           State.codes = data.supported_codes;
  //           renderCodeList();
  //           //  fetchLatest();
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     fetchCode();
  //   }, []);

  const handleChange = ({ target: { value, name } }) => {
    State.pair = {
      ...State.pair,
      [name]: value,
    };
  };

  const renderCodeList = () => {
    selects.forEach((select) => {
      State.codes.forEach(([code]) => {
        const element = document.createElement("option");
        element.value = code;
        element.textContent = code;
        select.insertAdjacentElement("beforeend", element);
      });
      const name = select.getAttribute("name");
      name && select.addEventListener("change", handleChange);
    });
  };

  return (
    <Provider store={store}>
      <div className="container">
        <h1>Check live foreign currency exchange rates</h1>
        <div className="main">
          <div className="wrapper">
            <Tabs />
            <ConvertPage />
            <SinglePage />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
