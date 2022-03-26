import { Grid, Icon, Typography } from "@material-ui/core";
import { loadCSS } from "fg-loadcss";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
Footer.propTypes = {};

function Footer(props) {
  const { t } = useTranslation();
  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <div className="footerContainer">
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Grid container>
            <Grid xs={6} >
              <Typography><b>{t("footer.contact")}</b></Typography>

            </Grid>
            <Grid xs={6} >
              <Typography><b>{t("footer.socialMedia")}</b></Typography>

            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6} className="columnArea">
              <Typography>{t("footer.address")}</Typography>
              <Typography>{t("footer.email")}</Typography>
              <Typography>{t("footer.phone")}</Typography>
            </Grid>
            <Grid item xs={6} className="columnArea columnArea--socialMedia">
              <div>
                <a
                  target="_blank"
                  href="https://www.facebook.com/dungnguyenne.2609/"
                >
                  <Icon
                    className="mainBox__icon fab fa-facebook"
                    color="primary"
                  />
                </a>
                <a target="_blank" href="#">
                  <Icon
                    className="mainBox__icon fab fa-twitter"
                    color="primary"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/d%C5%A9ng-nguy%E1%BB%85n-tr%C3%AD-349592207/"
                >
                  <Icon
                    className="mainBox__icon fab fa-linkedin-in"
                    color="primary"
                  />
                </a>
              </div>
            </Grid>
          </Grid>
        </Grid> */}


        <Grid item xs={12} className="coppyRightArea">
          {t("footer.coppyRight")}
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
