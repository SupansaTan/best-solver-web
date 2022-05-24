import React from "react"
import FindingIntegralComponent from "../../components/finding-integral/finding-integral";
import ResultComponent from "../../components/result/result";

function IntegralPage() {
  return(
    <React.Fragment>
      <h1>Integral Finding</h1>
      <FindingIntegralComponent/>
      <ResultComponent/>
    </React.Fragment>
  )
}

export default IntegralPage;