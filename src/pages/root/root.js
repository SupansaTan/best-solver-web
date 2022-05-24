import React from "react"
import FindingRootComponent from "../../components/finding-root/finding-root";
import ResultComponent from "../../components/result/result";

function RootPage() {
  return(
    <React.Fragment>
      <h1>Root Finding</h1>
      <FindingRootComponent/>
      <ResultComponent/>
    </React.Fragment>
  )
}

export default RootPage;