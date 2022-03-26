import { CircularProgress } from "@material-ui/core";
import { Button } from "@mui/material"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import './styles.scss'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//input 1 component được render ở trong dialog,
//openstatus: dialog được mở hay đóng
//handleCloseDialog: trong dialog có nút close, nhấn vào thì đóng dialog lại

export default function DialogSlide({ component: Component, ...rest }) {
  const {
    openStatus,
    handleCloseDialog,
    dialogTitle,
    displayLoadingForm,
    notDisplayCloseButton,
    handleConfirm,
    cancelText,
    cancelType,
    okText,
    okType,
    disabledConfirm
  } = rest;
  const [isRenderComponent, setIsRenderComponent] = useState(false);
  const { t } = useTranslation();
  const handleClose = () => {
    if (!handleCloseDialog) return;
    handleCloseDialog();
  };
  const handleConfirmDialog = () => {
    if (!handleConfirm) {
      return
    }

    handleConfirm()
  }
  useEffect(() => {
    if (!displayLoadingForm) {
      setIsRenderComponent(true);
      return;
    }
    if (
      displayLoadingForm &&
      isRenderComponent === false &&
      openStatus === true
    )
      setTimeout(() => {
        setIsRenderComponent(true);
      }, 3000);
  });

  return (
    <Dialog
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      fullWidth={true}
      maxWidth="sm"
      open={openStatus}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title"><b>{dialogTitle}</b></DialogTitle>
      <DialogContent className="scroll-custom">
        {!isRenderComponent && (
          <div className="displayCenterByFlex">
            <CircularProgress />
          </div>
        )}
        {isRenderComponent && !!Component && Component}
      </DialogContent>
      {!notDisplayCloseButton && (
        <DialogActions className="mr-16">
          <Button
            onClick={handleClose}
            color={cancelType ? cancelType : 'info'}
            variant="contained"
          >
            {cancelText ? cancelText : t("button.cancel")}
          </Button>
          <Button
            onClick={handleConfirmDialog}
            disabled={disabledConfirm}
            color={okType ? okType : 'primary'}
            variant="contained"

          >
            {okText ? okText : t("button.ok")}
          </Button>

        </DialogActions>
      )}
    </Dialog>
  );
}
