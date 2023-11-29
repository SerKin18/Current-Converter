import Tabs from "./component/tabs/tabs.jsx";
import ConvertPage from "./component/convert-page/convert-page.jsx";
import SinglePage from "./component/single-page/single-page.jsx";
import { createStore } from "redux";
import "./App.css";
import { Provider } from "react-redux";
import variables from "./js/variables.js";
import { useEffect } from "react";

const State = {
  key: "23158d58a9bf65ceebb6976c",
  url: "https://v6.exchangerate-api.com/v6/",
  codes: [],
  pair: {
    from: "",
    to: "",
  },
  amount: "12",
  loading: false,
  currentTab: "convert",
  currency: {
    code: "USD",
  },
  currencies: ["USD", "EUR", "UAH"],
  action: {
    remove: "remove",
    change: "change",
  },
};

// const action = { type: "currentTab", payload: "" };

const reducer = (state = State, action) => {
  switch (action.type) {
    case "currentTab":
      return { ...state, currentTab: action.payload };
    case "amount":
      return { ...state, amount: action.payload };
		case 'loading':
		return{...state, loading : action.payload}
    default:
      return state;
  }
};
const store = createStore(reducer);

const { selects } = variables;

function App() {
  useEffect(() => {
    async function fetchCode() {
      try {
        const response = await fetch(`${State.url}${State.key}/codes`);
        const data = await response.json();
        if (data.result === "success") {
          State.codes = data.supported_codes;
          renderCodeList();
          //  fetchLatest();
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchCode();
  }, []);

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
