/* eslint-disable no-use-before-define */
import { Menu, MenuItem } from "@material-ui/core";
import { listLocalStorage } from "constant/config";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
SelectBox.propTypes = {
  handleItemSelected: PropTypes.func.isRequired,
};

export default function SelectBox(props) {
  const {
    listValue, // danh sách các value trong ô select
    handleItemSelected, //handle việc chọn item nào
    isOpen, //status xem box mở hay đóng
    handleSelectBoxClose, 
    menuPos, //vị trí của menu
    selected, // này là highlight xem value nào đang được chọn
    displayPos, 
    typeOfSelected // check xem selected gia tri của trường nào
  } = props;
  
  const [selectedItem, setselectedItem] = useState(isOpen);

  useEffect(() => {
    setselectedItem(isOpen);
  }, [isOpen]);

  const handleClose = (event) => {
    if (!handleSelectBoxClose) return;
    handleSelectBoxClose();
  };

  const handleClickItem = (value) => {
    setselectedItem(null);
    if (!handleItemSelected) {
      return;
    }
    if (value) {
      handleItemSelected(value);
    }
  };
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={selectedItem}
        keepMounted
        open={Boolean(selectedItem)}
        onClose={handleClose}
        anchorOrigin={displayPos}
        transformOrigin={menuPos}
        getContentAnchorEl={null}
      >
        {listValue.map((value) => {
          return (
            <MenuItem
              key={value}
              selected={!!selected && value === typeOfSelected}
              onClick={() => handleClickItem(value)}
            >
              {value}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
