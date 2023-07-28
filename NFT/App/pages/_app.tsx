import type { AppProps } from "next/app";
import { ThirdwebProvider, paperWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      activeChain={activeChain}
      supportedWallets={[
        paperWallet({
          clientId: "3e2462df-afdb-4215-bbf1-e4ac6cddf301"
        })
      ]}  
    >
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
