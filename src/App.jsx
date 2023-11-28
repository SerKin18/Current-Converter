import Tabs from "./component/tabs/tabs.jsx";
import ConvertPage from "./component/convert-page/convert-page.jsx";
import SinglePage from "./component/single-page/single-page.jsx";

import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1>Check live foreign currency exchange rates</h1>
        <div className="main">
          <div className="wrapper">
            <Tabs />
            <ConvertPage/>
            <SinglePage />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
