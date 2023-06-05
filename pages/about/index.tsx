import Head from "next/head";
import Layout from "../../components/layout";
import messages from "./messages";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <div>
        <p>{messages.aboutMe.message}</p>
      </div>
    </Layout>
  );
};

export default About;
