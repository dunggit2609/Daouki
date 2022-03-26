import { ButtonBase, Grid, Tooltip } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@material-ui/icons/Menu";
import SelectBox from "components/selectBox";
import { listLocalStorage, _LIST_LINK } from "constant/config";
import languageModel from "core/model/languageModel";
import ToggleMode from "features/darkMode/components/toggleMode";
import { useFeatureOfMenu } from "hooks/useFeatureOfMenu";
import { useHeaderDisplay } from "hooks/useHeaderDisplay";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./styles.scss";
import { IconButton, MenuItem } from "@mui/material";
import logo from 'assets/images/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { StyledMenu } from 'components/DropdownMenu/DropdownMenu';
export default function Header() {
  const { t } = useTranslation();
  const {
    handleChooseUserAction,
    handleChooseLng,

    handleLanguageBoxClose,
    handleLanguageBoxClick,
    isLanguageOpen,
    isDisplayAuth,
    isLogin,
    isDisplayHeader,
  } = useFeatureOfMenu();
  //useDisplay
  const {
    scrollClass,
    isNotDisplayAppTitle,
    handleHamburgerClick,
  } = useHeaderDisplay();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const actions = [

    { icon: <LogoutIcon />, name: "Log out", FabProp: { color: 'primary' }, action: 'Log out' },
  ];
  const curLng = localStorage.getItem(listLocalStorage.language);
  const itemSelected = curLng;
  return (
    <div>
      {isDisplayHeader && (
        <>
          <AppBar position="fixed" color="transparent" className="appBar">
            <Toolbar className={scrollClass}>
              <Grid container spacing={3}>
                <Grid item xs={6} className='logo-container'>
                  {!isNotDisplayAppTitle && (
                    <>
                      <div className="toolbar__center">
                        <Link
                          className="decoration-none"
                          to={_LIST_LINK.index}
                        >
                          <img src={logo} width={100 + 'px'} height={50 + 'px'} />
                        </Link>
                      </div>
                    </>
                  )}
                </Grid>
                <div className="hamburgerIcon">
                  <ButtonBase
                    className="handleHamburgerClick"
                    onClick={handleHamburgerClick}
                  >
                    <MenuIcon></MenuIcon>
                  </ButtonBase>
                </div>
                <Grid item xs={6} className='header-action-container'>
                  {/* <div className="toolbar__extraFeature" id="extraFeature">
                    <Tooltip
                      title={t("toolTip.chooseLanguage")}
                      placement="bottom"
                    >
                      <ButtonBase
                        className="btn btn--hoverBottomSpot "
                        onClick={handleLanguageBoxClick}
                      >
                        <LanguageIcon color="primary" />
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
                      typeOfSelected={itemSelected}
                    />
                    <ToggleMode></ToggleMode>
                  </div> */}
                  {isDisplayAuth && !isLogin && (
                    <>
                      <div className="float-right-block">
                        <Link
                          className="decoration-none"
                          to={_LIST_LINK.login}
                          size="medium"
                        >
                          <Typography>
                            {t("auth.authButton.loginButton")}
                          </Typography>
                        </Link>

                        <Typography className="toolbar__separateIcon">
                          |
                        </Typography>

                        <Link
                          className="decoration-none"
                          to={_LIST_LINK.register}
                          size="medium"
                        >
                          <Typography>
                            {t("auth.authButton.registerButton")}
                          </Typography>
                        </Link>
                      </div>
                    </>
                  )}
                  {isLogin && (
                    <>
                      <div className="float-right-block">
                        <IconButton
                          aria-controls={open ? 'user-info' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          variant="contained"
                          disableElevation
                          onClick={handleClick}
                        >
                          <AccountCircleIcon />
                        </IconButton>
                        <StyledMenu
                          id="user-info"
                          MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          {actions.map(action => <MenuItem key={action.name} onClick={() => {
                            handleChooseUserAction(action.action)
                            setAnchorEl(null)
                          }}>
                            {action.icon}
                            {action.name}
                          </MenuItem>)}
                        </StyledMenu>
                      </div>
                    </>
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </>
      )}
    </div>
  );
}
