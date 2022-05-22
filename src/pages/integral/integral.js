import React from "react"
import FunctionSelector from "../../components/function-selector/function-selector";
import FindingIntegralComponent from "../../components/finding-integral/finding-integral";

function IntegralPage() {
  return(
    <React.Fragment>
      <h1>Integral Finding</h1>
      <FunctionSelector/>
      <FindingIntegralComponent/>
    </React.Fragment>
  )
}

export default IntegralPage;