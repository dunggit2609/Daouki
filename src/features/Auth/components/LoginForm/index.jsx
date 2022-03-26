import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,

  Container,
  Icon,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { Button } from '@mui/material'
import { LockOpenRounded } from "@material-ui/icons";
import DialogSlide from "components/DialogSlide";
import InputField from "components/FormControl/InputField";
import PasswordField from "components/FormControl/PasswordField";
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
LoginForm.propTypes = {
  OnSubmit: PropTypes.func.isRequired,
};

function LoginForm(props) {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const handleLoginFBClick = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t("yupValidate.required_field")),
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
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handleOnSubmit = async (values) => {
    const { OnSubmit } = props;
    if (OnSubmit) {
      await OnSubmit(values);
    }
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
      <Container maxWidth="xs" className="mainBox mainBox--loginBox">
        <div className="authSubmitting">
          {isSubmitting && <LinearProgress color="primary" />}
        </div>

        <Avatar className="mainBox__avatar">
          <LockOpenRounded />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          className="mainBox__title--auth"
        >
          {t("auth.authTitle.login")}
        </Typography>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <InputField
            name="username"
            label={t("auth.authField.username_email")}
            form={form}
            disabled={false}
          />

          <PasswordField
            name="password"
            label={t("auth.authField.password")}
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
            {t("auth.authButton.loginButton")}
          </Button>
        </form>
        <div className="mainBox__buttonArea">
          <div className="register">
            <span className="no-account">{t("auth.authButton.noAccount")}</span> 
            <span className="no-account">-</span> 
            <Link className="decoration-none decoration-none-hover-effect" to={_LIST_LINK.register}>{t("auth.authButton.registerButton")}</Link>
          </div>
          
          {/* <Button
            onClick={handleLoginFBClick}
            className="mainBox__iconSign"
            variant="contained"
          >
            <Icon className="mainBox__icon fab fa-facebook" color="secondary" />
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

export default LoginForm;
