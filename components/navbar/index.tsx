import Link from "next/link";
import navbarStyles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div style={styles.navbarContainer}>
      <div style={styles.homeButtonContainer}>
        <Link className={navbarStyles.a} href={"/"}>
          Morgan Black
        </Link>
      </div>
      <div style={styles.linksContainer}>
        <Link className={navbarStyles.a} href={"/about"}>
          About
        </Link>
        <Link className={navbarStyles.a} href={"/work"}>
          Work
        </Link>
        <Link
          className={navbarStyles.a}
          href={"mailto:morganblack1988@gmail.com"}
        >
          Contact
        </Link>
      </div>
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
  },
  linksContainer: {
    display: "flex",
  },
};

export default Navbar;
