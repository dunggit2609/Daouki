import AUTH from "constant/auth";
import { listLocalStorage, _LIST_LINK } from "constant/config";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

export const useFeatureOfMenu = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [isLanguageOpen, setIsLanguageOpen] = useState(null);
  const [isUserAvartaOpen, setIsUserAvartaOpen] = useState(null);
  const isDisplayAuth = location.pathname === _LIST_LINK.index ? true : false;
  const isDisplayHeader =
    location.pathname !== _LIST_LINK.notFound ? true : false;
  const user = useSelector((state) => state.auth.current);
  const isLogin =
    !!localStorage.getItem(AUTH.STORAGE_KEY)

  const handleLanguageBoxClick = (event) => {
    if (!isLanguageOpen) {
      setIsLanguageOpen(event.currentTarget);
    }
    if (!!isLanguageOpen) {
      setIsLanguageOpen(null);
    }
  };

  useEffect(() => {
    if (isLanguageOpen !== null) {
      setIsLanguageOpen(null);
    }

    if (isUserAvartaOpen !== null) {
      setIsUserAvartaOpen(null);
    }
  }, [location.pathname, isLanguageOpen, isUserAvartaOpen]);

  const handleLanguageBoxClose = () => {
    setIsLanguageOpen(null);
  };

  const handleUserBoxClick = (event) => {
    if (!isUserAvartaOpen) {
      setIsUserAvartaOpen(event.currentTarget);
    }
    if (!!isUserAvartaOpen) {
      setIsUserAvartaOpen(null);
    }
  };

  const handleUserBoxClose = () => {
    setIsUserAvartaOpen(null);
  };

  const handleChooseLng = (value) => {
    localStorage.setItem(listLocalStorage.language, value);
    window.location.reload();
  };

  const handleChooseUserAction = (value) => {
    switch (value) {
      case "Log out":
        localStorage.removeItem(AUTH.STORAGE_KEY);
        localStorage.removeItem(AUTH.TOKEN_KEY);
        localStorage.removeItem(AUTH.EXPIRED_TOKEN);
        history.push(_LIST_LINK.index);
        enqueueSnackbar(t("notiStack.logoutSuccess"), { variant: "success" });
        break;
      default:
        break;
    }
  };

  return {
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
  };
};
