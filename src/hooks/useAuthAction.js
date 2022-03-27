import { unwrapResult } from "@reduxjs/toolkit";
import { _LIST_LINK } from "constant/config";
import {
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
      const action =
        authType === "login"
          ? loginGetUserInforSlice()
          : authType === "register"
            ? registerSlice()
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
      else if (authType === "login") {
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
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
