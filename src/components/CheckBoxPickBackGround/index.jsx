import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@material-ui/core";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import clsx from "clsx";
import "./styles.scss";
CheckBoxPickBackGround.propTypes = {};

function CheckBoxPickBackGround(props) {
  const { checked, handleChangeCheckedBox, name } = props;
  const handleChangeCheckBox = (event) => {
      if (!handleChangeCheckedBox) return;
    handleChangeCheckedBox({ [event.target.name]: event.target.checked });
  };
  return (
    <Checkbox
      name={name}
      checked={checked}
      onChange={handleChangeCheckBox}
      className="checkBoxPickBackGround"
      disableRipple
      color="default"
      checkedIcon={
        // <span
        //   className={clsx(
        //     "checkBoxPickBackGround__icon",
        //     "checkBoxPickBackGround__checkedIcon"
        //   )}
        // />
        <CheckBoxIcon />
      }
          icon={<CheckBoxOutlineBlankIcon />
                // < span className="checkBoxPickBackGround__icon" />
            }
      inputProps={{ "aria-label": "decorative checkbox" }}
      
    />
  );
}

export default CheckBoxPickBackGround;
