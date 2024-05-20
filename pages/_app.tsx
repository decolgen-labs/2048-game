import type { AppProps } from "next/app";
import GameProvider from "@/context/game-context";
import "@/styles/globals.css";
import ProviderApp from "@/providers/ProviderApp";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderApp>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </ProviderApp>
  );
}
