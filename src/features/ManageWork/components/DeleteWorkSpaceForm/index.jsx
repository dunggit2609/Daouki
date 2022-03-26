import { yupResolver } from "@hookform/resolvers/yup";
import { FormLabel, Grid } from "@material-ui/core";
import { Button } from '@mui/material';

import InputField from "components/FormControl/InputField";
import CustomizedRadios from "components/RadioButtonCustom";
import { listWorkSpaceBackGround } from "constant/config";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import "./styles.scss";

function DeleteWorkSpaceForm(props) {
  const { handleCloseDialog, handleDelete, idWorkSpace } = props;
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      workSpace: idWorkSpace,
    },
  });
  const handleOnSubmit = () => {
    if (!handleDelete) return;
    if (!handleCloseDialog) return;
    handleDelete(idWorkSpace);
    handleCloseDialog();
    form.reset();
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        {" "}
        <Button
          fullWidth
          color="secondary"
          className="mainBox__submitButton"
          variant="contained"
          onClick={handleOnSubmit}
        >
          {t("work-space.dialog.deleteWorkSpaceButton")}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          color="default"
          className="mainBox__submitButton"
          variant="contained"
          onClick={handleCloseDialog}
        >
          {t("work-space.dialog.closeButton")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default DeleteWorkSpaceForm;
