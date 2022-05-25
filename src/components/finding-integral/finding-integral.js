import React, { useState, useEffect, useContext } from "react"
import createModule from "../../wasm/mjs/findingIntegral.mjs";
import { ResultContext } from "../../context/result.js";
import { SelectFunctionContext } from "../../context/select-function.js";
import { IntegralMethod } from "../../constants/integral-equation.js";
import { Equation } from "../../constants/equation.js";
import { getSimson } from "../../js/integral-finding/simson-rule.js";
import { getTrapezoid } from "../../js/integral-finding/trapezoid-rule.js";
import { getReimann } from "../../js/integral-finding/riemann-sum.js";

export default function FindingIntegralComponent() {
  const [reimann, setReimann] = useState();
  const [trapezoid, setTrapezoid] = useState();
  const [simpson, setSimpson] = useState();
  const [timeSpentReimann, setTimeSpentReimann] = useState();
  const [timeSpentTrapezoid, setTimeSpentTrapezoid] = useState();
  const [timeSpentSimpson, setTimeSpentSimpson] = useState();
  const [methodSelect, setMethodSelect] = useState(0);
  const { changeSol, changeTimeSpent } = useContext(ResultContext)
  const { changePySol, changePyTimeSpent, changeGraphData, changeJsSol, changeJsTimeSpent } = useContext(ResultContext)
  const { selectFunc, changeSelectFunc } = useContext(SelectFunctionContext)

  useEffect(
    () => {
    createModule().then((Module) => {
      setReimann(() => Module.cwrap('findReimann', 'number', ['number']));
      setTrapezoid(() => Module.cwrap('findTrapezoid', 'number', ['number']));
      setSimpson(() => Module.cwrap('findSimpson', 'number', ['number']));
      setTimeSpentReimann(() => Module.cwrap('timeSpentReimann', 'number', ['number']))
      setTimeSpentTrapezoid(() => Module.cwrap('timeSpentTrapezoid', 'number', ['number']))
      setTimeSpentSimpson(() => Module.cwrap('timeSpentSimpson', 'number', ['number']))
    });
  }, []);

  useEffect(() => {
    const getResult = () => {
      let result;
      if(selectFunc>0 && methodSelect>0) {
        // -- wasm & JS --
        switch(methodSelect) {
          case 1:
            changeSol(reimann(selectFunc))
            changeTimeSpent(timeSpentReimann(selectFunc))

            result = getReimann(selectFunc)
            changeJsSol(result[0])
            changeJsTimeSpent(result[1])
            break;
          case 2:
            changeSol(trapezoid(selectFunc))
            changeTimeSpent(timeSpentTrapezoid(selectFunc))

            result = getTrapezoid(selectFunc)
            changeJsSol(result[0])
            changeJsTimeSpent(result[1])
            break;
          case 3:
            changeSol(simpson(selectFunc))
            changeTimeSpent(timeSpentSimpson(selectFunc))

            result = getSimson(selectFunc)
            changeJsSol(result[0])
            changeJsTimeSpent(result[1])
            break;
          default:
            return;
        }
  
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
        changeJsSol('')
        changeJsTimeSpent('')
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