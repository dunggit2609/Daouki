import { unwrapResult } from "@reduxjs/toolkit";
import { _LIST_LINK } from "constant/config";
import {
  loginGetTokenSlice,
  loginGetUserInforSlice,
  registerSlice,
} from "core/redux/authSlice";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

export const useAuthAction = (authType) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const history = useHistory();
  const OnSubmit = async (values) => {
    try {
      const data = { ...values };
      const payload = data;
      const action =
        authType === "login"
          ? loginGetTokenSlice(payload)
          : authType === "register"
          ? registerSlice(payload)
          : "";
      if (authType === "register") {
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        // const user = unwrapResult(resultAction);
        const msg =
          authType === "login"
            ? t("notiStack.loginSuccess")
            : authType === "register"
            ? t("notiStack.registerSuccess")
            : "";
        enqueueSnackbar(msg, { variant: "success" });
        history.push(_LIST_LINK.index);
      }
      if (authType === "login") {
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        // const token = unwrapResult(resultAction);
        const getUserAction = loginGetUserInforSlice();
        const getUserInfor = await dispatch(getUserAction);
        unwrapResult(getUserInfor);
        // const logginedUSer = unwrapResult(getUserInfor);
        const msg =
          authType === "login"
            ? t("notiStack.loginSuccess")
            : authType === "register"
            ? t("notiStack.registerSuccess")
            : "";
        enqueueSnackbar(msg, { variant: "success" });
        history.push(_LIST_LINK.index);
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return { OnSubmit };
};
