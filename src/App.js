import React, { useState, useEffect } from "react";
import { ResultProvider } from "./context/result.js";
import { SelectFunctionProvider } from "./context/select-function.js";
import createModule from "./wasm/mjs/bisection.mjs";

function App() {
  const [bisection, setBisection] = useState();
  const [sol, setSol] = useState();
  const [timeSpent, setTimeSpent] = useState();

  useEffect(
    () => {
    createModule().then((Module) => {
      setBisection(() => Module.cwrap("findBisection", "float", ["number"]));
    });
  }, []);

  if (!bisection) {
    return "Loading webassembly...";
  }

  const findRoot = (funcSelect) => {
    let startTime = performance.now()
    setSol(bisection(funcSelect))
    let endTime = performance.now()
    setTimeSpent(endTime-startTime)
  }

  return (
    <SelectFunctionProvider>
      <ResultProvider>
        <div className="App">
          <p>{ 'result: ' + sol }</p>
          <p>{ 'time spent: ' + timeSpent + ' ms.' }</p>
          <button onClick={()=> findRoot(3)}>Click to get solution</button>
        </div>
      </ResultProvider>
    </SelectFunctionProvider>
  );
}

export default App;
