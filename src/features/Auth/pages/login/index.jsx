import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";
import Login from "features/Auth/components/Login";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function LoginPage(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const user = useSelector((state) => state.auth.current);
  const isLogin =
    !!localStorage.getItem(AUTH.TOKEN_KEY) &&
    !!(Object.keys(user).length !== 0);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isLogin) {
      enqueueSnackbar(t("notiStack.hasLogin"), { variant: "success" });
      setTimeout(() => history.push(_LIST_LINK.manageWork), 1000);
    }
  }, []);
  return <Login />;
}

export default LoginPage;
