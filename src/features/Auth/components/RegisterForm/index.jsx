import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Container,
  Icon,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import {  Button} from '@mui/material'
import { VpnKeyRounded } from "@material-ui/icons";
import DialogSlide from "components/DialogSlide";
import InputField from "components/FormControl/InputField";
import PasswordField from "components/FormControl/PasswordField";
import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";
import { loadCSS } from "fg-loadcss";
import { UseSpinnerLoading } from "hooks/useSpinnerLoading";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, Link as RouterLink } from "react-router-dom";

import * as yup from "yup";
import "./styles.scss";
RegisterForm.propTypes = {
  OnSubmit: PropTypes.func.isRequired,
};

function RegisterForm(props) {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t("yupValidate.emailRequired"))
      .email(t("yupValidate.emailWrongFormat")),
    phone: yup
      .string()
      .required(t("yupValidate.phoneRequired"))
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        t("yupValidate.phoneWrongFormat")
      ),
    username: yup.string().required(t("yupValidate.usernameRequired")),
    retypepassword: yup
      .string()
      .required(t("yupValidate.retypePassWordRequired"))
      .oneOf([yup.ref("password")], t("yupValidate.retypePassWordNotMatch")),
    password: yup
      .string()
      .required(t("yupValidate.passwordRequired"))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        t("yupValidate.passWordWrongFormat")
      ),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      phone: "",
      username: "",
      password: "",
      retypepassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const [openDialog, setOpenDialog] = useState(false);
  const { handleDisplaySpinner } = UseSpinnerLoading();

  const handleLoginFBClick = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleOnSubmit = async (values) => {
    const { OnSubmit } = props;
    localStorage.removeItem(AUTH.TOKEN_KEY);
    delete values.retypepassword;
    if (OnSubmit) {
      await OnSubmit(values);
    }
    // form.reset();
  };
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
    <div className="container">
      <Container maxWidth="xs" className="mainBox">
        <div className="authSubmitting">
          {isSubmitting && <LinearProgress color="primary" />}
        </div>

        <Avatar className="mainBox__avatar">
          <VpnKeyRounded></VpnKeyRounded>
        </Avatar>

        <Typography
          component="h1"
          variant="h5"
          className="mainBox__title--auth"
        >
          {t("auth.authTitle.register")}
        </Typography>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <InputField
            name="email"
            label={t("auth.authField.email")}
            form={form}
            disabled={false}
          />
          <InputField
            name="phone"
            label={t("auth.authField.phone")}
            form={form}
            disabled={false}
          />
          <InputField
            name="username"
            label={t("auth.authField.username")}
            form={form}
            disabled={false}
          />

          <PasswordField
            name="password"
            label={t("auth.authField.password")}
            form={form}
            disable={false}
          />

          <PasswordField
            name="retypepassword"
            label={t("auth.authField.retypepassword")}
            form={form}
            disable={false}
          />

          <Button
            color="primary"
            className="mainBox__submitButton"
            variant="contained"
            fullWidth
            type="submit"
          >
            {t("auth.authButton.registerButton")}
          </Button>
        </form>
        <div className="mainBox__buttonArea">
          <div className="register">
            <span className="have-account">{t("auth.authButton.haveAccount")}</span>
            <span className="have-account">-</span>
            <Link className="decoration-none decoration-none-hover-effect" to={_LIST_LINK.login}>{t("auth.authButton.loginButton")}</Link>
          </div>
          {/* <Button
            onClick={handleLoginFBClick}
            className="mainBox__iconSign"
            variant="contained"
          >
            <Icon className="mainBox__icon fab fa-facebook" color="primary" />
            <span>{t("auth.authButton.loginByFb")}</span>
          </Button> */}
        </div>
        <DialogSlide
          openStatus={openDialog}
          handleCloseDialog={handleDialogClose}
          dialogTitle={t("auth.dialog.dialogLoginFb")}
        />
      </Container>
    </div>
  );
}

export default RegisterForm;
