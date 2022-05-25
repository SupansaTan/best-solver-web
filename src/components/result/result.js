import React, {useContext, useState, useEffect} from "react";
import { ResultContext } from "../../context/result.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faJsSquare } from '@fortawesome/free-brands-svg-icons';
import WasmLogo from '../../assets/wasm.png';

function ResultComponent() {
  const [solDiff, setSolDiff] = useState('')
  const [sortTimeSpent, setSortTimeSpent] = useState([])
  const { sol, timeSpent, pysol, pytimeSpent, graph, jsSol, jsTimeSpent } = useContext(ResultContext)

  useEffect(() => {
    if(sol==='' || pysol==='') {
      setSolDiff('')
    }
    else {
      const diff = parseFloat(sol) - parseFloat(pysol)
      setSolDiff(Math.abs(diff))
    }
  }, [pysol])

  useEffect(() => {
    if(timeSpent!=='' && pytimeSpent!=='' && jsTimeSpent!=='') {
      const timeUsed = [{item:'wasm',time:Number(timeSpent)}, {item:'py', time:Number(pytimeSpent)}, {item:'js', time:Number(jsTimeSpent)}]
      setSortTimeSpent(timeUsed.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)))
    }
  }, [pytimeSpent, jsTimeSpent])

  const getIcon = (item) => {
    if(item === 'js') {
      return <FontAwesomeIcon key="js-icon" icon={faJsSquare} className="ms-3 fs-4 text-warning" />
    }
    else if(item === 'py') {
      return <FontAwesomeIcon key="py-icon" icon={faPython} className="ms-3 fs-4" />
    }
    else {
      return <img key="wasm-icon" src={WasmLogo} width="25px" alt='wasm' className="ms-2" />
    }
  }

  const IconElement = () => {
    return (
      <React.Fragment>
        {sortTimeSpent.map((i) => getIcon(i.item)) }
      </React.Fragment>
    )
  }

  return(
    <React.Fragment>
      {/* result */}
      <div className="row mb-3">
        <h2 className="mb-1 text-darkblue">Result</h2>
        <div className="col">
          <div className="bg-darkblue px-3 py-3 rounded-15">
            <div className="text-white mb-2">
              <i className="bi bi-pin-angle me-2"></i>
              <span className="text-white">{ 'ค่าความแตกต่างของผลลัพธ์ (ระหว่าง Wasm & Python) : ' + solDiff}</span>
            </div>
            <div className="text-white d-flex align-items-center">
              <i className="bi bi-clock me-2"></i>
              <span>เรียงลำดับการใช้เวลา (จากน้อยไปมาก) : </span>
              { sortTimeSpent.length>0 ? IconElement(): <></> }
            </div>
          </div>
        </div>
      </div>

      {/* solution of wasm, python, js */}
      <div className="row gy-3">
        {/* wasm */}
        <div className="col">
          <h3 className="mb-1">Wasm</h3>
          <div className="bg-lightgrey px-3 py-2 rounded-15">
            <p className="mb-1">Solution: <span className="text-danger fw-bold">{sol}</span></p>
            <p className="mb-0">Time Spent: <span className="text-danger fw-bold">{timeSpent}</span></p>
          </div>
        </div>

        {/* python */}
        <div className="col">
          <h3 className="mb-1">Python</h3>
          <div className="bg-lightgrey px-3 py-2 rounded-15">
            <p className="mb-1">Solution: <span className="text-danger fw-bold">{pysol}</span></p>
            <p className="mb-0">Time Spent: <span className="text-danger fw-bold">{pytimeSpent}</span></p>
          </div>
        </div>

        {/* js */}
        <div className="col">
          <h3 className="mb-1">JavaScript</h3>
          <div className="bg-lightgrey px-3 py-2 rounded-15">
            <p className="mb-1">Solution: <span className="text-danger fw-bold">{jsSol}</span></p>
            <p className="mb-0">Time Spent: <span className="text-danger fw-bold">{jsTimeSpent}</span></p>
          </div>
        </div>
      </div>

      {/* graph */}
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
          <img alt="" src={'data:image/png;base64,' + graph}></img>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ResultComponent;