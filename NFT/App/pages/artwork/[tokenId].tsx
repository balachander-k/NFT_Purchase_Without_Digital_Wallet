import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import { ThirdwebNftMedia, useAddress, useContract, useNFT, usePaperWalletUserEmail } from '@thirdweb-dev/react';
import { CheckoutWithCard } from '@paperxyz/react-client-sdk';
import { useState } from 'react';

export default function Artwork() {
    const router = useRouter();
    const { tokenId } = router.query;
    console.log(tokenId);

    const address = useAddress();
    const email = usePaperWalletUserEmail();

    const {
        contract
    } = useContract('0x1376bbFd23d4B6d0206238791e3Fd07DB182d4DB', 'edition-drop');
    const {
        data: nft,
        isLoading: loadingNft,
    } = useNFT(contract, tokenId as string);

    const [paymentSuccesful, setPaymentSuccesful] = useState(false);

    const handlePaymentSuccess = () => {
        setPaymentSuccesful(true);
    }

    return (
        <div className={styles.container}>
            {!loadingNft && nft ? (
                <div className={styles.artContainer}>
                    <div className={styles.artImage}>
                        <ThirdwebNftMedia
                            metadata={nft.metadata}
                            height='100%'
                            width='100%'
                        />
                    </div>
                    <div className={styles.artInfo}>
                            <div>
                                <h1>{nft.metadata.name}</h1>
                                {address && email && tokenId ? (
                                    !paymentSuccesful ? (
                                        <div>
                                            <CheckoutWithCard
                                                configs={{
                                                contractId: "7e774987-6d95-4bb9-919d-7523928f95b1",
                                                walletAddress: address,
                                                contractArgs: {
                                                    "tokenId": tokenId
                                                },
                                                email: email.data,
                                                }}
                                                onPaymentSuccess={handlePaymentSuccess}
                                                onReview={(result) => console.log(result)}
                                                options={{
                                                    colorBackground: '#ffffff',
                                                    colorPrimary: '#99e0ff',
                                                    colorText: '#363636',
                                                    borderRadius: 6,
                                                    inputBackgroundColor: '#ffffff',
                                                    inputBorderColor: '#b0b0b0',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <p>Payment succesful!</p>
                                            <button
                                                onClick={() => router.push(`/profile/${address}`)}
                                            >View collectibles</button>
                                        </div>
                                    )
                                    
                                ) : (
                                    <p>Login to buy this artwork</p>
                                )}
                            </div>
                    </div>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
};