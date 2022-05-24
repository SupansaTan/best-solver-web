import React, { useState, useEffect, useContext } from "react"
import createModule from "../../wasm/mjs/findingIntegral.mjs";
import { ResultContext } from "../../context/result.js";
import { SelectFunctionContext } from "../../context/select-function.js";
import { IntegralMethod, IntegralEquation } from "../../constants/integral-equation.js";
import { Equation } from "../../constants/equation.js";

export default function FindingIntegralComponent() {
  const [reimann, setReimann] = useState();
  const [trapezoid, setTrapezoid] = useState();
  const [simpson, setSimpson] = useState();
  const [methodSelect, setMethodSelect] = useState(0);
  const { sol, timeSpent, changeSol, changeTimeSpent } = useContext(ResultContext)
  const { pysol, pytimeSpent, changePySol, changePyTimeSpent, graph, changeGraphData } = useContext(ResultContext)
  const { selectFunc, changeSelectFunc } = useContext(SelectFunctionContext)

  useEffect(
    () => {
    createModule().then((Module) => {
      setReimann(() => Module.cwrap('findReimann', 'number', ['number']));
      setTrapezoid(() => Module.cwrap('findTrapezoid', 'number', ['number']));
      setSimpson(() => Module.cwrap('findSimpson', 'number', ['number']))
    });
  }, []);

  useEffect(() => {
    const getResult = () => {
      if(selectFunc>0 && methodSelect>0) {
        // -- wasm --
        let startTime;
        switch(methodSelect) {
          case 1:
            startTime = performance.now()
            changeSol(reimann(selectFunc))
            break;
          case 2:
            startTime = performance.now()
            changeSol(trapezoid(selectFunc))
            break;
          case 3:
            startTime = performance.now()
            changeSol(simpson(selectFunc))
            break;
          default:
            return;
        }
        let endTime = performance.now()
        changeTimeSpent(endTime-startTime)
  
        // -- pyhon --
        // http://127.0.0.1:8000 django server
        fetch(`http://127.0.0.1:8000/api/${IntegralMethod[methodSelect]}/${selectFunc}`)
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
      <div className="row my-3 mx-1">
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
          <select className="form-select" id="methodSelect" defaultValue='0' onChange={(event)=> {setMethodSelect(Number(event.target.value))}}>
            <option value="0">Choose...</option>
            <option value="1">Riemann Sum</option>
            <option value="2">Trapezoid Rule</option>
            <option value="3">Simson Rule</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  )
}