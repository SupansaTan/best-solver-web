import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ResultProvider } from "./context/result.js";
import { SelectFunctionProvider } from "./context/select-function.js";
import MathJax from 'react-mathjax';
import routes from './routes';
import NavbarComponent from "./components/navbar/navbar.js";

function App() {
  return (
    <BrowserRouter>
      <MathJax.Provider>
        <SelectFunctionProvider>
          <ResultProvider>
            <NavbarComponent/>
            <div className="container mt-3">
              <Routes>
                {
                  routes.map((route, index) => {
                    return (route.component) ?
                      (
                        <Route
                          key={index}
                          path={route.path}
                          element={<route.component/> }
                        />
                      ) : (null);
                  })
                }
                <Route path="*" element={<Navigate to="/root" />} />
              </Routes> 
            </div>
          </ResultProvider>
        </SelectFunctionProvider>
      </MathJax.Provider>
    </BrowserRouter>
  );
}

export default App;
