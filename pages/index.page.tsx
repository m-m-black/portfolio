import Head from "next/head";
import GitHubIcon from "../components/github-icon";

const Home = () => {
  return (
    <>
      <Head>
        <title>Morgan Black</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 gap-10">
        <h1 className="text-6xl font-bold tracking-tight text-white">
          Morgan Black
        </h1>
        <a
          href="https://github.com/m-m-black"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-400 text-sm font-medium transition-all duration-200 hover:border-zinc-400 hover:text-white"
        >
          <GitHubIcon />
          m-m-black
        </a>
      </main>
    </>
  );
};

export default Home;
