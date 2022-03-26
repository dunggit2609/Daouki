import { useTranslation } from "react-i18next";

export const ListFilter = () => {
  const { t } = useTranslation();
  const listFilter = [
    t("listFilter.all"),
    t("listFilter.owned"),
    t("listFilter.joined"),
  ];
  return listFilter;
};
