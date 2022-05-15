import React, { useState, useEffect, useContext } from "react"
import createModule from "../../wasm/mjs/findingRoot.mjs";
import { ResultContext } from "../../context/result.js";
import { SelectFunctionContext } from "../../context/select-function.js";
import { RootMethod } from "../../constants/root-equaltion.js";

export function FindingRootComponent() {
  const [root, setRoot] = useState();
  const [methodSelect, setMethodSelect] = useState();
  const { sol, timeSpent, changeSol, changeTimeSpent } = useContext(ResultContext)
  const { selectFunc } = useContext(SelectFunctionContext)

  useEffect(
    () => {
    createModule().then((Module) => {
      setRoot(() => Module.cwrap("find" + RootMethod[methodSelect], "float", ["number"]));
    });
  }, [methodSelect]);

  const getResult = () => {
    let startTime = performance.now()
    changeSol(root(selectFunc))
    let endTime = performance.now()
    changeTimeSpent(endTime-startTime)
  }

  return(
    <React.Fragment>
      <div className="p-2">
        <p>{ 'solution :' + sol }</p>
        <p>{ 'time spent :' + timeSpent }</p>
      </div>
    </React.Fragment>
  )
}