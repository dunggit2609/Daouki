import { Grid, Typography } from "@material-ui/core";
import { useWindowSize } from "hooks/useWindowSize";
import React from "react";
import "./styles.scss";
ShowFeature.propTypes = {};

function ShowFeature(props) {
  const { data } = props;
  const [width] = useWindowSize();

  return (
    <div className="showFeatureSection">
      {width > 959 && (
        <>
          {data.imgPos === "left" && (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <img
                    decoding="async"
                    loading="lazy"
                    className="img-fluid"
                    src={data.img}
                    alt="im"
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5">{data.feature}</Typography>
                  <Typography variant="h4">{data.title}</Typography>
                  <Typography>{data.description}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {data.imgPos === "right" && (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5">{data.feature}</Typography>
                  <Typography variant="h4">{data.title}</Typography>
                  <Typography>{data.description}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    decoding="async"
                    loading="lazy"
                    src={data.img}
                    alt="image"
                  />
                </Grid>
              </Grid>
            </>
          )}{" "}
        </>
      )}

      {width < 960 && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <img
                decoding="async"
                loading="lazy"
                className="img-fluid"
                src={data.img}
                alt="image"
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={12}>
              <Typography variant="h5">{data.feature}</Typography>
              <Typography variant="h4">{data.title}</Typography>
              <Typography>{data.description}</Typography>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default ShowFeature;
