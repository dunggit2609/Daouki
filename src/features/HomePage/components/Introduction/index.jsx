import {  Grid, Typography } from "@material-ui/core";
import { Button } from '@mui/material';

import { introductionData_En } from "assets/data/introductionData-en";
import { introductionData_Vi } from "assets/data/introductionData-vi";
import { listLocalStorage, _LIST_LINK } from "constant/config";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./styles.scss";

Introduction.propTypes = {};

function Introduction(props) {
  const curLng = localStorage.getItem(listLocalStorage.language);
  const [data, setData] = useState({});
  useEffect(() => {
    switch (curLng) {
      case "vi":
        setData(introductionData_Vi);
        break;
      case "en":
        setData(introductionData_En);
        break;
      default:
        break;
    }
  }, []);
  return (
    <div className="introductionSection">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} className="textArea">
          <Typography variant="h4">{data.title}</Typography>
          <Typography>{data.subtitle}</Typography>
          <Button
            component={RouterLink}
            to={_LIST_LINK.register}
            color="secondary"
            className="btn btn--hoverBottomSpot  btn--red btn--noMarginLeft btn--fullSize"
          >
            {data.button}
          </Button>
        </Grid>
        <Grid item md={4} className="imgArea">
          <img
            decoding="async"
            loading="lazy"
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
            width="931"
            height="1205"
            className="img-fluid"
            alt=""
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{data.feature}</Typography>
          <Typography>{data.subFeature}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Introduction;
