import { ButtonBase } from "@material-ui/core";
import React from "react";
import { Link as RouterLink, Redirect, useLocation } from "react-router-dom";
import "./styles.scss";
NotFound.propTypes = {};

function NotFound(props) {
  const location = useLocation();
  return (
    <div className="notFound">
      <Redirect from={location.pathname} to="/NotFound"></Redirect>
      <div className="notFound__Text">Not Found!!!</div>
      <br></br>
      <ButtonBase component={RouterLink} to="/">
        {" "}
        Go back home !
      </ButtonBase>
    </div>
  );
}

export default NotFound;
