import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const query = router.query.q as string;
      setKeyword(query || "");
    }
  }, [router.isReady, router.query.q]);

  return (
    <>
      <Head>
        <title>Sitecore Search: Results</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl m-4">Search Results</h1>
        <p className="text-xl m-4">Keyword: {keyword}</p>
      </main>
    </>
  );
}
