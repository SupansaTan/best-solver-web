import React from "react"
import FunctionSelector from "../../components/function-selector/function-selector";
import FindingRootComponent from "../../components/finding-root/finding-root";

function RootPage() {
  return(
    <React.Fragment>
      <h1>Finding Root</h1>
      <FunctionSelector/>
      <FindingRootComponent/>
    </React.Fragment>
  )
}

export default RootPage;