import type { AppProps } from "next/app";

import ProviderApp from "@/providers/ProviderApp";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderApp>
      <Head>
        <title>2048 | Starkarcade Game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Play the popular 2048 game on Starkarcade. Challenge yourself and try to reach the 2048 tile!"
        />
      </Head>
      <Component {...pageProps} />
    </ProviderApp>
  );
}
