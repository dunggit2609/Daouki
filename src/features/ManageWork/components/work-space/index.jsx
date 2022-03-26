import {
  ButtonBase,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import DialogSlide from "components/DialogSlide";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router";
import DeleteWorkSpaceForm from "../DeleteWorkSpaceForm";
import "./styles.scss";
WorkSpace.propTypes = {};

function WorkSpace(props) {
  const { data, handleDeleteWorkSpace } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const match = useRouteMatch();
  const workSpaceID = `workSpaceID${data._id}`;
  const { t } = useTranslation();
  const handleDeleteWorkSpaceClick = () => {
    setOpenDialog(true);
    // if (!handleDeleteWorkSpace) return;
    // console.log("id", id);
    // await handleDeleteWorkSpace(id);
  };
  useEffect(() => {
    let workSpace = document.getElementById(workSpaceID);

    if (workSpace) {
      workSpace.style.backgroundImage = `url(${data.image})`;
    }
  }, []);
  return (
    <Grid item lg={3} md={4} xs={6} className="workSpace">
      <a
        rel="preload"
        as="iamge"
        href={`${match.path}/${data._id}`}
        className="workSpace__Link"
      >
        <div className="workSpace__Name">
          <Typography variant="h5">{data.name}</Typography>
        </div>
        <Paper id={workSpaceID} className="workSpace__Cover"></Paper>
      </a>
      <div className="buttonGroup">
        <Tooltip title={t("toolTip.deleteWorkSpace")} placement="bottom">
          <ButtonBase
            onClick={() => {
              handleDeleteWorkSpaceClick(data._id);
            }}
            className="btn btn--hoverBottomSpot "
          >
            <DeleteOutlined />
          </ButtonBase>
        </Tooltip>
      </div>
      <DialogSlide
        component={
          <DeleteWorkSpaceForm
            idWorkSpace={data._id}
            handleDelete={handleDeleteWorkSpace}
            handleCloseDialog={handleDialogClose}
          />
        }
        notDisplayCloseButton={true}
        openStatus={openDialog}
        handleCloseDialog={handleDialogClose}
        dialogTitle={t("work-space.dialog.titleConfirmDelete")}
      />
    </Grid>
  );
}

export default WorkSpace;
