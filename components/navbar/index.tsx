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
    <div style={styles.navbarContainer}>
      <div style={styles.homeButtonContainer}>
        <Link className={navbarStyles.a} href={"/"}>
          Morgan Black
        </Link>
      </div>
      {isMobile ? (
        isMenuVisible ? (
          <Menu hideMenu={hideMenu} />
        ) : (
          <div style={styles.linksContainer}>
            <p onClick={showMenu}>Menu</p>
          </div>
        )
      ) : (
        <div style={styles.linksContainer}>
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

const styles = {
  navbarContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#f8dfcb",
  },
  homeButtonContainer: {
    display: "flex",
    padding: "20px",
    alignItems: "center",
  },
  linksContainer: {
    display: "flex",
    padding: "20px",
    alignItems: "center",
  },
};

export default Navbar;
