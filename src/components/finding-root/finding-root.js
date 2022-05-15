import React, { useState, useEffect, useContext } from "react"
import createModule from "../../wasm/mjs/findingRoot.mjs";
import { ResultContext } from "../../context/result.js";
import { SelectFunctionContext } from "../../context/select-function.js";
import { RootMethod } from "../../constants/root-equaltion.js";

export default function FindingRootComponent() {
  const [root, setRoot] = useState();
  const [methodSelect, setMethodSelect] = useState(1);
  const { sol, timeSpent, changeSol, changeTimeSpent } = useContext(ResultContext)
  const { selectFunc } = useContext(SelectFunctionContext)

  useEffect(
    () => {
    createModule().then((Module) => {
      setRoot(() => Module.cwrap("find" + RootMethod[methodSelect], "float", ["number"]));
    });
  }, [methodSelect]);

  const getResult = (event) => {
    setMethodSelect(event.target.value)
    let startTime = performance.now()
    changeSol(root(selectFunc))
    let endTime = performance.now()
    changeTimeSpent(endTime-startTime)
  }

  return(
    <React.Fragment>
      <div className="row my-3 mx-1">
        <p className="col-7 bg-lightgrey rounded-3 p-2 mb-0">function</p>
        <div className="input-group col">
          <label className="input-group-text" htmlFor="methodSelect">Method</label>
          <select className="form-select" id="methodSelect" defaultValue='0' onChange={(event)=> getResult(event)}>
            <option value="0">Choose...</option>
            <option value="1">Bisection</option>
            <option value="2">Newton</option>
            <option value="3">Regula Falsi</option>
            <option value="4">Secant</option>
          </select>
        </div>
      </div>

      <div className="p-2">
        <p>{ 'solution : ' + sol }</p>
        <p>{ 'time spent : ' + timeSpent }</p>
      </div>
    </React.Fragment>
  )
}