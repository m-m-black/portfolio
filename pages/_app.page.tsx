import { Montserrat } from "next/font/google";
import "../styles/global.css";

const montserrat = Montserrat({ subsets: ["latin"] });

const App = ({ Component, pageProps }) => {
  return (
    <div className={montserrat.className}>
      <Component {...pageProps} />;
    </div>
  );
};

export default App;
