import Head from "next/head";
import styles from "./layout.module.css";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 viewport-fit=cover"
        />
      </Head>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
