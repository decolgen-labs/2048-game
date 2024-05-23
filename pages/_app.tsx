import type { AppProps } from "next/app";

import ProviderApp from "@/providers/ProviderApp";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderApp>
      <Component {...pageProps} />
    </ProviderApp>
  );
}
