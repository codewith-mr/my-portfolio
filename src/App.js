import React, { useState, useEffect } from "react";
import "../src/App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./Screen/Home";
import LoaderScreen from "./Component/Loader/LoaderScreen";

const App = () => {
  console.log(67);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <LoaderScreen /> : <Home />}</>;
};

export default App;
