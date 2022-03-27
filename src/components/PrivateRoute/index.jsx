import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route } from "react-router";

PrivateRoute.propTypes = {};


//check xem link nào private link ( đã đăng nhập mới được truy cập)
function PrivateRoute({ component: Component, ...rest }) {
  const isLogin = !!localStorage.getItem(AUTH.STORAGE_KEY);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  useEffect(() => {
    if (!isLogin) {
      enqueueSnackbar(t("notiStack.notLogin"), { variant: "success" });
    }
  }, []);
  if (isLogin) {
    //gui request check token
    //con han => render component
    //het han => hien diaglog thong bao dang nhap lai
    // => handle click => redirect to login
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: _LIST_LINK.login, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
