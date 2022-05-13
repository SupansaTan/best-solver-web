import React, { useState, useEffect } from "react";
import createModule from "./wasm/mjs/bisection.mjs";

function App() {
  const [bisection, setBisection] = useState();

  useEffect(
    () => {
    createModule().then((Module) => {
      setBisection(() => Module.cwrap("findBisection", "null", ["number"]));
    });
  }, []);

  if (!bisection) {
    return "Loading webassembly...";
  }

  return (
    <div className="App">
      <p>Result show in console</p>
      <p>{ bisection(3) }</p>
    </div>
  );
}

export default App;
