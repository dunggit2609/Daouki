import { yupResolver } from "@hookform/resolvers/yup";
import {  Grid } from "@material-ui/core";
import { Button } from '@mui/material';

import { FormatStrikethroughTwoTone } from "@material-ui/icons";
import InputField from "components/FormControl/InputField";
import CustomizedRadios from "components/RadioButtonCustom";
import { listWorkSpaceBackGround } from "constant/config";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import "./styles.scss";

function AddWorkSpaceForm(props) {
  const { handleCloseDialog, handleAddNew } = props;
  const [backGroundChecked, setBackGroudChecked] = useState({
    image: listWorkSpaceBackGround[0],
  });
  const handleChangeRadioButtonBackgroundWorkSpace = (value) => {
    setBackGroudChecked({ image: value });
  };
  const { t } = useTranslation();
  const schema = yup.object().shape({
    workSpace: yup.string().required("Please enter your work space's name ."),
  });
  const form = useForm({
    defaultValues: {
      workSpace: "",
    },
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = (values) => {
    if (!handleAddNew) return;
    if (!handleCloseDialog) return;
    handleAddNew({ ...values, ...backGroundChecked });
    handleCloseDialog();
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      <Grid container sapcing={5}>
        <Grid item xs={12}>
          <InputField
            name="workSpace"
            label={t("work-space.dialog.inputFieldLabel")}
            form={form}
            disabled={false}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomizedRadios
            handleChangeRadioButtonBackgroundWorkSpace={
              handleChangeRadioButtonBackgroundWorkSpace
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            className="mainBox__submitButton"
            variant="contained"
            fullWidth
            type="submit"
          >
            {t("work-space.dialog.addButton")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddWorkSpaceForm;
