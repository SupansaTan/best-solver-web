import React, { useState } from 'react';

const contextDefault = {
  sol: '',
  timeSpent: '',
  changeSol: () => {},
  changeTimeSpent: () => {}
}

export const ResultContext = React.createContext(contextDefault);

export const ResultProvider = ({ children }) => {
  const [sol, setSol] = useState('')
  const [timeSpent, setTimeSpent] = useState('')
  const [pysol, setPySol] = useState('')
  const [pytimeSpent, setPyTimeSpent] = useState('')
  const [graph, setGraph] = useState('')
  const [jsSol, setJsSol] = useState('')
  const [jsTimeSpent, setJsTimeSpent] = useState('')

  const changeSol = (solution) => setSol(solution);
  const changeTimeSpent = (time) => setTimeSpent(time)
  const changePySol = (solution) => setPySol(solution);
  const changePyTimeSpent = (time) => setPyTimeSpent(time)
  const changeGraphData = (graph) => setGraph(graph)
  const changeJsSol = (solution) => setJsSol(solution);
  const changeJsTimeSpent = (solution) => setJsTimeSpent(solution);

  return(
    <ResultContext.Provider value={{ sol, changeSol, timeSpent, changeTimeSpent, 
                                    pysol, changePySol, pytimeSpent, changePyTimeSpent,
                                    graph, changeGraphData, jsSol, changeJsSol,
                                    jsTimeSpent, changeJsTimeSpent }}>
      { children }
    </ResultContext.Provider>
  )
}