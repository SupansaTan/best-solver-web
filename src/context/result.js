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
  const [timeSpent, setTimeSpent] = useState(0.0)

  const changeSol = (solution) => setSol(solution);
  const changeTimeSpent = (time) => setTimeSpent(time)

  return(
    <ResultContext.Provider value={{ sol, changeSol, timeSpent, changeTimeSpent }}>
      { children }
    </ResultContext.Provider>
  )
}