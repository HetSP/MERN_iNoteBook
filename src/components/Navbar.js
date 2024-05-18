import React, {useEffect, useContext, useState, useRef} from "react";
import noteContext from "../context/notes/noteContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  //useLocation is used to check on which route we are currently and we have used it to mark the currently active tab in navbar
  let location = useLocation();
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const {user, getUser} = context;
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
      getUser();
    }else{
      navigate("/")
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const handleLogout = () => {
    if(isOpen){
      closeRef.current.click();
    }
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to={localStorage.getItem("token") ? "/home" : "/"}
          >
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to={localStorage.getItem("token") ? "/home" : "/"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <p>
                <button
                  className="btn btn-primary mx-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  ref={closeRef}
                  onClick={toggleCollapse}
                >
                  Profile
                </button>
                <button className="btn btn-primary mx-1" onClick={handleLogout}>
                  Logout
                </button>
              </p>
            )}
          </div>
        </div>
      </nav>
      <div
        className="card collapse"
        id="collapseExample"
        style={{
          width: "18rem",
          position: "absolute",
          top: "10%",
          right: "0",
          zIndex: 1000,
          margin: "7px"
        }}
      >
        <div className="card-body">
          <h6 className="card-subtitle mb-1 text-muted">Name: {user.name}</h6>
          <h6 className="card-subtitle text-muted">Email: {user.email}</h6>
        </div>
      </div>
    </>
  );
}

export default Navbar;
