import React, {useContext} from "react";
import { ResultContext } from "../../context/result.js";

function ResultComponent() {
  const { sol, timeSpent, pysol, pytimeSpent, graph, jsSol, jsTimeSpent } = useContext(ResultContext)

  return(
    <React.Fragment>
      <div className="row gy-3">
        {/* wasm */}
        <div className="col">
          <h3 className="mb-1">Wasm</h3>
          <div className="bg-lightgrey px-3 py-2 rounded-15">
            <p className="mb-1">Solution: <span className="text-danger">{sol}</span></p>
            <p className="mb-0">Time Spent: <span className="text-danger">{timeSpent}</span></p>
          </div>
        </div>

        {/* python */}
        <div className="col">
          <h3 className="mb-1">Python</h3>
          <div className="bg-lightgrey px-3 py-2 rounded-15">
            <p className="mb-1">Solution: <span className="text-danger">{pysol}</span></p>
            <p className="mb-0">Time Spent: <span className="text-danger">{pytimeSpent}</span></p>
          </div>
        </div>

        {/* js */}
        <div className="col">
          <h3 className="mb-1">JavaScript</h3>
          <div className="bg-lightgrey px-3 py-2 rounded-15">
            <p className="mb-1">Solution: <span className="text-danger">{jsSol}</span></p>
            <p className="mb-0">Time Spent: <span className="text-danger">{jsTimeSpent}</span></p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
          <img alt="" src={'data:image/png;base64,' + graph}></img>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ResultComponent;