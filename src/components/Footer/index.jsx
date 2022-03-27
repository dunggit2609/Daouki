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
        <Grid item xs={12} className="coppyRightArea">
          {t("footer.coppyRight")}
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
