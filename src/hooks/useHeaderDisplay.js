import {
  listPrivateLink,
  _LIST_LINK,
} from "constant/config";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const useHeaderDisplay = () => {
  const location = useLocation();
  const [isScroll, setscrollPos] = useState(false);
  const isNotDisplayAppTitle = !!listPrivateLink.includes(location.pathname);
  const isPageDisplayScrollClass =
    location.pathname !== _LIST_LINK.index ? true : false;

  const scrollClass =
    isScroll || isPageDisplayScrollClass
      ? "toolBar--scroll"
      : "toolBar--unScroll";

  const handleScroll = () => {
    let scroll = document.getElementsByClassName("App")[0].scrollTop > 0;
    setscrollPos(scroll);
  };

  useEffect(() => {
    if (!!document.getElementsByClassName("App")[0]) {
      document
        .getElementsByClassName("App")[0]
        .addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHamburgerClick = () => {
    let nav = document.getElementById("Hamburger");
    nav.style.right = "0";
  };

  return { scrollClass, isNotDisplayAppTitle, handleHamburgerClick };
};
