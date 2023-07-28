import { ThirdwebNftMedia, useContract, useNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  const {
    contract
  } = useContract('0x1376bbFd23d4B6d0206238791e3Fd07DB182d4DB', 'edition-drop');
  const {
    data: nfts,
    isLoading: loadingNfts,
  } = useNFTs(contract);

  return (
    <div className={styles.container}>
        <div className={styles.heroBanner}>
          <div>
            <h1>Artwork</h1>
            <p>Buy and sell digital artwork</p>
          </div>
          <div></div>
        </div>
        {!loadingNfts && nfts && (
          <div className={styles.grid}>
            {nfts.map((nft) => (
              <Link href={`/artwork/${nft.metadata.id}`} key={nft.metadata.id}>
                <div className={styles.artCard}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                  />
                  <div className={styles.cardContent}>
                    <h3>{nft.metadata.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
};

export default Home;
