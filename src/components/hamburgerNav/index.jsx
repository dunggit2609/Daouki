import { ButtonBase, Grid, Tooltip, Typography } from "@material-ui/core";
import { AccountCircle, LanguageOutlined } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import SelectBox from "components/selectBox";
import { _LIST_LINK } from "constant/config";
import languageModel from "core/model/languageModel";
import userLoginedModel from "core/model/userLoginedModel";
import ToggleMode from "features/darkMode/components/toggleMode";
import { useFeatureOfMenu } from "hooks/useFeatureOfMenu";
import { useHamburgerDisplay } from "hooks/useHamburgerDisplay";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import "./styles.scss";

function HamburgerNav(props) {
  const { t } = useTranslation();
  const {
    handleChooseUserAction,
    handleChooseLng,
    handleUserBoxClose,
    handleUserBoxClick,
    handleLanguageBoxClose,
    handleLanguageBoxClick,
    isLanguageOpen,
    isDisplayAuth,
    isLogin,
    isDisplayHeader,
    isUserAvartaOpen,
  } = useFeatureOfMenu();
  const { handleCloseHamburgerClick } = useHamburgerDisplay();
  return (
    <div className="navHamburger" id="Hamburger">
      {isDisplayHeader && (
        <div>
          <ButtonBase
            className="btn btn--hoverBottomSpot  btn--close"
            onClick={handleCloseHamburgerClick}
          >
            <CloseIcon></CloseIcon>
          </ButtonBase>

          <Grid container spacing={1} alignItems="center" direction="column">
            {isDisplayAuth && (
              <>
                <Grid item xs={12}>
                  {" "}
                  <ButtonBase
                    color="inherit"
                    className="btn btn--hoverBottomSpot"
                    component={RouterLink}
                    to={_LIST_LINK.login}
                    size="medium"
                  >
                    <Typography>
                      {t("auth.authButton.loginButton")}
                    </Typography>
                  </ButtonBase>
                </Grid>
                <Grid item xs={12}>
                  <ButtonBase
                    color="inherit"
                    className="btn btn--hoverBottomSpot "
                    component={RouterLink}
                    to={_LIST_LINK.register}
                    size="medium"
                  >
                    <Typography>
                      {t("auth.authButton.registerButton")}
                    </Typography>
                  </ButtonBase>
                </Grid>
              </>
            )}

            {isLogin && (
              <>
                <Grid item xs={12}>
                  <Tooltip title={t("toolTip.userAction")} placement="bottom">
                    <ButtonBase
                      className="btn btn--hoverBottomSpot "
                      onClick={handleUserBoxClick}
                    >
                      <AccountCircle />
                    </ButtonBase>
                  </Tooltip>
                  <SelectBox
                    handleItemSelected={handleChooseUserAction}
                    listValue={userLoginedModel}
                    isOpen={isUserAvartaOpen}
                    handleSelectBoxClose={handleUserBoxClose}
                    menuPos={{ vertical: "top", horizontal: "right" }}
                    displayPos={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    selected={true}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <ToggleMode />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title={t("toolTip.chooseLanguage")} placement="bottom">
                <ButtonBase
                  className="btn btn--hoverBottomSpot "
                  onClick={handleLanguageBoxClick}
                >
                  <LanguageOutlined />
                </ButtonBase>
              </Tooltip>
              <SelectBox
                handleItemSelected={handleChooseLng}
                listValue={languageModel}
                isOpen={isLanguageOpen}
                handleSelectBoxClose={handleLanguageBoxClose}
                menuPos={{ vertical: "top", horizontal: "left" }}
                displayPos={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                selected={true}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default HamburgerNav;
