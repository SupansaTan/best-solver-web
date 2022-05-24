import React, { useState, useEffect, useContext } from "react"
import createModule from "../../wasm/mjs/findingRoot.mjs";
import { ResultContext } from "../../context/result.js";
import { SelectFunctionContext } from "../../context/select-function.js";
import { RootMethod, RootEquation } from "../../constants/root-equation.js";
import { Equation } from "../../constants/equation.js";
import MathJax from 'react-mathjax';

export default function FindingRootComponent() {
  const [bisection, setBisection] = useState();
  const [newton, setNewton] = useState();
  const [regula, setRegula] = useState();
  const [secant, setSecant] = useState();
  const [methodSelect, setMethodSelect] = useState(0);
  const { sol, timeSpent, changeSol, changeTimeSpent } = useContext(ResultContext)
  const { pysol, pytimeSpent, changePySol, changePyTimeSpent, graph, changeGraphData } = useContext(ResultContext)
  const { selectFunc, changeSelectFunc } = useContext(SelectFunctionContext)

  useEffect(
    () => {
    createModule().then((Module) => {
      setBisection(() => Module.cwrap('findBisection', 'number', ['number']));
      setNewton(() => Module.cwrap('findNewton', 'number', ['number']));
      setRegula(() => Module.cwrap('findRegulaFalsi', 'number', ['number']));
      setSecant(() => Module.cwrap('findSecant', 'number', ['number']));
    });
  }, []);

  useEffect(() => {
    const getResult = () => {
      if(selectFunc>0 && methodSelect>0) {
        // -- wasm --
        let startTime = performance.now()
        switch(methodSelect) {
          case 1:
            changeSol(bisection(selectFunc))
            break;
          case 2:
            changeSol(newton(selectFunc))
            break;
          case 3:
            changeSol(regula(selectFunc))
            break;
          case 4:
            changeSol(secant(selectFunc))
            break;
          default:
            changeSol(bisection(selectFunc))
        }
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
            changeGraphData(data.graph)
          })
          .catch(error => {
            changePySol('')
            changePyTimeSpent('')
            changeGraphData('')
          })
      }
      else {
        changeSol('')
        changeTimeSpent('')
        changePySol('')
        changePyTimeSpent('')
        changeGraphData('')
      }
    }

    getResult()
  }, [methodSelect, selectFunc])

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
        {/* select function */}
        <div className="col-7 rounded-3">
          <select className="form-select" id="funcSelect" defaultValue='0' 
            onChange={(event)=> {changeSelectFunc(Number(event.target.value))}}>
            <option value="0">Choose Function...</option>
            { selectFunction() }
          </select>
        </div>

        {/* select method for find solution */}
        <div className="input-group col">
          <label className="input-group-text" htmlFor="methodSelect">Method</label>
          <select className="form-select" id="methodSelect" defaultValue='0' 
            onChange={(event)=> {setMethodSelect(Number(event.target.value))}}>
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
        <h1>Graph</h1>
        <img alt="root" src={'data:image/jpeg;base64,' + graph}></img>
      </div>
    </React.Fragment>
  )
}