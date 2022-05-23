import React, { useState } from 'react';

const contextDefault = {
  selectFunc: '',
  changeSelectFunc: () => {},
}

export const SelectFunctionContext = React.createContext(contextDefault);

export const SelectFunctionProvider = ({ children }) => {
  const [selectFunc, setSelectFunc] = useState(0)

  const changeSelectFunc = (num) => setSelectFunc(num)

  return(
    <SelectFunctionContext.Provider value={{ selectFunc, changeSelectFunc }}>
      { children }
    </SelectFunctionContext.Provider>
  )
}