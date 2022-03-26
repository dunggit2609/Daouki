import { ButtonBase, Paper, Typography } from "@material-ui/core";
import { ListFilter } from "hooks/useListFilter";

import React from "react";
import { useTranslation } from "react-i18next";

import "./styles.scss";
FilterArea.propTypes = {};

function FilterArea(props) {
  const { t } = useTranslation();

  const listFilter = ListFilter();
  const { handleFilter } = props;
  const handleFilterClick = (value) => {
    if (!handleFilter) return;
    switch (value) {
      case t("listFilter.all"):
        handleFilter("all");
        break;
      case t("listFilter.owned"):
        handleFilter("created");
        break;
      case t("listFilter.joined"):
        handleFilter("joined");
        break;
      default:
        break;
    }
  };

  return (
    <Paper className="filterContainer">
      <div className="filterTitle">
        <Typography>{t("work-space.filterArea")}</Typography>
      </div>
      <div className="listFilter">
        {listFilter.map((value) => {
          return (
            <ButtonBase key={value} className="btn" onClick={() => handleFilterClick(value)}>
              {value}
            </ButtonBase>
          );
        })}
      </div>
    </Paper>
  );
}

export default FilterArea;
