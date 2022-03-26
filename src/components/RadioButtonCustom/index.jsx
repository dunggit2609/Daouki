import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { listWorkSpaceBackGround } from "constant/config";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    width: "150px",
    height: "100px",
    backgroundSize: "cover",

    backgroundColor: "rgba(0, 0, 0, 0.3)",
    filter: "brightness(70%)",
    "input:hover ~ &": {
      transform: "scale(1.2)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    filter: "brightness(100%)",
    "input:hover ~ &": {
      transform: "scale(1.2)",
    },
    boxShadow: "0.5px 0.5px 4px 4px #9e9ef6",
  },
});

// Inspired by blueprintjs
export function StyledRadio(props) {
  const { linkimg, radioid } = props;
  const idPrefix = "radioBackgroundWorkSpace";
  const radioBackgroundIdChecked = `${idPrefix}${radioid}`;
  const radioBackgroundId = `${idPrefix}${radioid}`;

  const classes = useStyles();
  useEffect(() => {
    let radioButtonChecked = document.getElementById(radioBackgroundIdChecked);
    let radioButton = document.getElementById(radioBackgroundId);
    if (radioButtonChecked) {
      radioButtonChecked.style.backgroundImage = `url(${linkimg})`;
    }
    if (radioButton) {
      radioButton.style.backgroundImage = `url(${linkimg})`;
    }
  }, []);
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={
        <span
          id={radioBackgroundIdChecked}
          className={clsx(classes.icon, classes.checkedIcon)}
        />
      }
      icon={<span id={radioBackgroundId} className={classes.icon} />}
      {...props}
    />
  );
}

export default function CustomizedRadios(props) {
  const { handleChangeRadioButtonBackgroundWorkSpace } = props;
  const listLinkImage = listWorkSpaceBackGround;

  const handleChange = (event) => {
    if (!handleChangeRadioButtonBackgroundWorkSpace) return;
    handleChangeRadioButtonBackgroundWorkSpace(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Work space's back ground</FormLabel>
      <RadioGroup
        defaultValue={listLinkImage[0]}
        aria-label="Work space's name"
        name="customized-radios-workspaceBackground"
        onChange={handleChange}
      >
        <Grid container className="displayRowFlex">
          {listLinkImage.map((value, index) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<StyledRadio linkimg={value} radioid={index + 1} />}
            />
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
