import { CSSProperties } from "react";
import Link from "next/link";
import menuStyles from "./menu.module.css";

const Menu = ({ hideMenu }) => {
  return (
    <div style={styles.menuContainer as CSSProperties}>
      <div style={styles.headerContainer}>
        <div style={styles.homeButtonContainer}>
          <Link className={menuStyles.a} href={"/"}>
            Morgan Black
          </Link>
        </div>
        <div style={styles.buttonContainer}>
          <p onClick={hideMenu}>Close</p>
        </div>
      </div>
      <div style={styles.bodyContainer}>
        <div style={styles.linksContainer as CSSProperties}>
          <Link
            className={`${menuStyles.a} ${menuStyles.padded}`}
            onClick={hideMenu}
            href={"/about"}
          >
            About
          </Link>
          <Link
            className={`${menuStyles.a} ${menuStyles.padded}`}
            onClick={hideMenu}
            href={"/work"}
          >
            Work
          </Link>
          <Link
            className={`${menuStyles.a} ${menuStyles.padded}`}
            onClick={hideMenu}
            href={"mailto:morganblack1988@gmail.com"}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  menuContainer: {
    position: "absolute",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8dfcb",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  homeButtonContainer: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
  bodyContainer: {
    paddingTop: "20px",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
  },
};

export default Menu;
