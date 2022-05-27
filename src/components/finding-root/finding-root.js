import React, { useState, useEffect, useContext } from "react"
import createModule from "../../wasm/mjs/findingRoot.mjs";
import { ResultContext } from "../../context/result.js";
import { SelectFunctionContext } from "../../context/select-function.js";
import { RootMethod } from "../../constants/root-equation.js";
import { Equation } from "../../constants/equation.js";
import { getBisection } from "../../js/root-finding/bisection.js";
import { getNewton } from "../../js/root-finding/newton.js";
import { getRegula } from "../../js/root-finding/regula.js";
import { getSecant } from "../../js/root-finding/secant.js";
import ResultComponent from "../../components/result/result";

export default function FindingRootComponent() {
  const [bisection, setBisection] = useState();
  const [newton, setNewton] = useState();
  const [regula, setRegula] = useState();
  const [secant, setSecant] = useState();
  const [timeSpentBisection, setTimeSpentBisection] = useState();
  const [timeSpentNewton, setTimeSpentNewton] = useState();
  const [timeSpentRegula, setTimeSpentRegula] = useState();
  const [timeSpentSecant, setTimeSpentSecant] = useState();
  const [methodSelect, setMethodSelect] = useState(0);
  const { changeSol, changeTimeSpent } = useContext(ResultContext)
  const { changePySol, changePyTimeSpent, changeGraphData, changeJsSol, changeJsTimeSpent } = useContext(ResultContext)
  const { selectFunc, changeSelectFunc } = useContext(SelectFunctionContext)

  useEffect(
    () => {
    createModule().then((Module) => {
      setBisection(() => Module.cwrap('findBisection', 'number', ['number']));
      setNewton(() => Module.cwrap('findNewton', 'number', ['number']));
      setRegula(() => Module.cwrap('findRegulaFalsi', 'number', ['number']));
      setSecant(() => Module.cwrap('findSecant', 'number', ['number']));
      setTimeSpentBisection(() => Module.cwrap('timeSpentBisection', 'string', ['number']));
      setTimeSpentNewton(() => Module.cwrap('timeSpentNewton', 'string', ['number']));
      setTimeSpentRegula(() => Module.cwrap('timeSpentRegulaFalsi', 'string', ['number']));
      setTimeSpentSecant(() => Module.cwrap('timeSpentSecant', 'string', ['number']));
    });
  }, []);

  useEffect(() => {
    const getResult = () => {
      let result;
      clearResultValue()
      if(selectFunc>0 && methodSelect>0) {
        // -- wasm & JS --
        switch(methodSelect) {
          case 1:
            changeSol(bisection(selectFunc))
            changeTimeSpent(timeSpentBisection(selectFunc))

            result = getBisection(selectFunc)
            changeJsSol(result[0])
            changeJsTimeSpent(result[1])
            break;
          case 2:
            changeSol(newton(selectFunc))
            changeTimeSpent(timeSpentNewton(selectFunc))

            result = getNewton(selectFunc)
            changeJsSol(result[0])
            changeJsTimeSpent(result[1])
            break;
          case 3:
            changeSol(regula(selectFunc))
            changeTimeSpent(timeSpentRegula(selectFunc))

            result = getRegula(selectFunc)
            changeJsSol(result[0])
            changeJsTimeSpent(result[1])
            break;
          case 4:
            changeSol(secant(selectFunc))
            changeTimeSpent(timeSpentSecant(selectFunc))

            result = getSecant(selectFunc)
            changeJsSol(result[0])
            changeJsTimeSpent(result[1])
            break;
          default:
            return 0;
        }
  
        // -- pyhon --
        // https://best-solver-api.herokuapp.com django api server
        fetch(`https://best-solver-api.herokuapp.com/api/${RootMethod[methodSelect]}/${selectFunc}`)
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
        clearResultValue()
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

  const clearResultValue = () => {
    changeSol('')
    changeTimeSpent('')
    changePySol('')
    changePyTimeSpent('')
    changeGraphData('')
    changeJsSol('')
    changeJsTimeSpent('')
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

      { (methodSelect && selectFunc) ? <ResultComponent/>:<></>}
    </React.Fragment>
  )
}