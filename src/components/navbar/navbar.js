import React from "react"

function NavbarComponent() {
  return(
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#!"><i class="bi bi-calculator-fill me-2"></i>Best Solver</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" 
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/root">Root</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/integral">Integral</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default NavbarComponent;