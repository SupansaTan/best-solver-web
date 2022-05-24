import React, { useState, useEffect, useContext } from "react"
import createModule from "../../wasm/mjs/findingRoot.mjs";
import { ResultContext } from "../../context/result.js";
import { SelectFunctionContext } from "../../context/select-function.js";
import { RootMethod, RootEquation } from "../../constants/root-equation.js";
import { Equation } from "../../constants/equation.js";
import MathJax from 'react-mathjax';

export default function FindingRootComponent() {
  const [root, setRoot] = useState();
  const [methodSelect, setMethodSelect] = useState(0);
  const { sol, timeSpent, changeSol, changeTimeSpent } = useContext(ResultContext)
  const { pysol, pytimeSpent, changePySol, changePyTimeSpent } = useContext(ResultContext)
  const { selectFunc, changeSelectFunc } = useContext(SelectFunctionContext)

  useEffect(
    () => {
    createModule().then((Module) => {
      setRoot(() => Module.cwrap("find" + RootMethod[methodSelect], "number", ["number"]));
    });
  }, [methodSelect]);

  const getResult = () => {
    if(selectFunc>0 && methodSelect>0) {
      // -- wasm --
      let startTime = performance.now()
      changeSol(root(selectFunc))
      let endTime = performance.now()
      changeTimeSpent(endTime-startTime)

      // -- pyhon --
      // http://127.0.0.1:8000 django server
      fetch(`http://127.0.0.1:8000/api/${RootMethod[methodSelect]}/${selectFunc}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          changePySol(data.result)
          changePyTimeSpent(data.time)
        })
    }
    else {
      changeSol('')
      changeTimeSpent('')
      changePySol('')
      changePyTimeSpent('')
    }
  }

  const selectFunction = () => {
    return (
      <React.Fragment>
        {
          Equation.map((item, index) => {
            return (
              <option value={index+1} key={'equal' + index+1}>
                { item }
              </option>
            )
          })
        }
      </React.Fragment>
    )
  }

  return(
    <React.Fragment>
      <div className="row my-3 px-1">
        {/* show function */}
        <div className="col-7 rounded-3">
          <select className="form-select" id="funcSelect" defaultValue='0' onChange={(event)=> {changeSelectFunc(event.target.value);getResult() }}>
            <option value="0">Choose Function...</option>
            { selectFunction() }
          </select>
        </div>

        {/* select method for find solution */}
        <div className="input-group col">
          <label className="input-group-text" htmlFor="methodSelect">Method</label>
          <select className="form-select" id="methodSelect" defaultValue='0' onChange={(event)=> {setMethodSelect(event.target.value); getResult()}}>
            <option value="0">Choose...</option>
            <option value="1">Bisection</option>
            <option value="2">Newton</option>
            <option value="3">Regula Falsi</option>
            <option value="4">Secant</option>
          </select>
        </div>
      </div>

      {/* result */}
      <div className="p-2">
        <h1>Web Assambly</h1>
        <p>{ 'solution : ' + sol }</p>
        <p>{ 'time spent : ' + timeSpent }</p>
        <h1>Python</h1>
        <p>{ 'solution : ' + pysol }</p>
        <p>{ 'time spent : ' + pytimeSpent }</p>
      </div>
    </React.Fragment>
  )
}