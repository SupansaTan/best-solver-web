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

  const changeSol = (solution) => setSol(solution);
  const changeTimeSpent = (time) => setTimeSpent(time)
  const changePySol = (solution) => setPySol(solution);
  const changePyTimeSpent = (time) => setPyTimeSpent(time)

  return(
    <ResultContext.Provider value={{ sol, changeSol, timeSpent, changeTimeSpent, 
                                    pysol, changePySol, pytimeSpent, changePyTimeSpent}}>
      { children }
    </ResultContext.Provider>
  )
}