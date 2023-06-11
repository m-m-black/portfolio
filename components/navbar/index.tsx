import React, { useState, useEffect } from "react";
import Link from "next/link";
import navbarStyles from "./navbar.module.css";
import Menu from "../menu";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const showMenu = () => {
    setIsMenuVisible(true);
  };

  const hideMenu = (e) => {
    setIsMenuVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={navbarStyles.navbarContainer}>
      <div className={navbarStyles.homeButtonContainer}>
        <Link className={navbarStyles.a} href={"/"}>
          Morgan Black
        </Link>
      </div>
      {isMobile ? (
        isMenuVisible ? (
          <Menu hideMenu={hideMenu} />
        ) : (
          <div className={navbarStyles.linksContainer}>
            <p onClick={showMenu}>Menu</p>
          </div>
        )
      ) : (
        <div className={navbarStyles.linksContainer}>
          <Link
            className={`${navbarStyles.a} ${navbarStyles.padded}`}
            href={"/about"}
          >
            About
          </Link>
          <Link
            className={`${navbarStyles.a} ${navbarStyles.padded}`}
            href={"/work"}
          >
            Work
          </Link>
          <Link
            className={`${navbarStyles.a} ${navbarStyles.padded}`}
            href={"mailto:morganblack1988@gmail.com"}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
