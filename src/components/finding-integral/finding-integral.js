import React, { useState, useEffect, useContext } from "react"
import createModule from "../../wasm/mjs/findingIntegral.mjs";
import { ResultContext } from "../../context/result.js";
import { SelectFunctionContext } from "../../context/select-function.js";
import { IntegralMethod, IntegralEquation } from "../../constants/integral-equation.js";
import MathJax from 'react-mathjax';

export default function FindingIntegralComponent() {
  const [integral, setIntegral] = useState();
  const [methodSelect, setMethodSelect] = useState(1);
  const { sol, timeSpent, changeSol, changeTimeSpent } = useContext(ResultContext)
  const { selectFunc } = useContext(SelectFunctionContext)

  useEffect(
    () => {
    createModule().then((Module) => {
      setIntegral(() => Module.cwrap("find" + IntegralMethod[methodSelect], "number", ["number"]));
    });
  }, [methodSelect]);

  const getResult = () => {
    let startTime = performance.now()
    changeSol(integral(selectFunc))
    let endTime = performance.now()
    changeTimeSpent(endTime-startTime)
  }

  return(
    <React.Fragment>
      <div className="row my-3 mx-1">
        {/* show function */}
        <p className="col-7 bg-lightgrey rounded-3 p-2 mb-0">
          <MathJax.Node inline formula={ IntegralEquation[selectFunc] } />
        </p>

        {/* select method for find solution */}
        <div className="input-group col">
          <label className="input-group-text" htmlFor="methodSelect">Method</label>
          <select className="form-select" id="methodSelect" defaultValue='0' onChange={(event)=> {setMethodSelect(event.target.value); getResult()}}>
            <option value="0">Choose...</option>
            <option value="1">Riemann Sum</option>
            <option value="2">Trapezoid Rule</option>
            <option value="3">Simson Rule</option>
          </select>
        </div>
      </div>

      {/* result */}
      <div className="p-2">
        <p>{ 'solution : ' + sol }</p>
        <p>{ 'time spent : ' + timeSpent }</p>
      </div>
    </React.Fragment>
  )
}