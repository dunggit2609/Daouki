import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useWindowSize } from "./useWindowSize";

export const useHamburgerDisplay = () => {
  const location = useLocation();
  const [currentLocation, setcurrentLocation] = useState(location.pathname);

  const [width] = useWindowSize();

  if (currentLocation !== location.pathname) {
    setcurrentLocation(location.pathname);
  }

  useEffect(() => {
    if (width > 1023) {
      let nav = document.getElementById("Hamburger");
      if (!!nav) {
        nav.style.right = "-110%";
      }
    }
  }, [width]);

  const handleCloseHamburgerClick = () => {
    let nav = document.getElementById("Hamburger");
    if (!!nav) {
      nav.style.right = "-110%";
    }
  };

  useEffect(() => {
    let nav = document.getElementById("Hamburger");
    if (!!nav) {
      nav.style.right = "-110%";
    }
  }, [currentLocation]);

  return {handleCloseHamburgerClick};
};
