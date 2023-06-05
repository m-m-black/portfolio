import Head from "next/head";
import Layout from "../../components/layout";
import { messages } from "./messages";

const Work = () => {
  return (
    <Layout>
      <Head>
        <title>Work</title>
      </Head>
      <div>
        <p>{messages.workPageDescription.message}</p>
      </div>
    </Layout>
  );
};

export default Work;
