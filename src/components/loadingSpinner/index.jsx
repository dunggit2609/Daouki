import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";

LoadingSpinner.propTypes = {};

function LoadingSpinner(props) {
  const displayLoading = useSelector((state) => state.spinner);
  const classDisplay = displayLoading
    ? "containerSpinner--block"
    : "containerSpinner--none";
  useEffect(() => {
    if (displayLoading) {
      let app = document.getElementsByClassName("App")[0];
      if (!!app) {
        app.style.overflowY = "hidden";
      }
    }
    if (!displayLoading) {
      let app = document.getElementsByClassName("App")[0];
      if (!!app) {
        app.style.overflowY = "auto";
      }
    }
  }, [displayLoading]);
  return (
    <div className={classDisplay}>
      <div className="spinnerBlock">
        <CircularProgress color="primary" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
