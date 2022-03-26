import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";
import Register from "features/Auth/components/Register";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function RegisterPage(props) {
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

  return (
    <div>
      <Register />
    </div>
  );
}

export default RegisterPage;
