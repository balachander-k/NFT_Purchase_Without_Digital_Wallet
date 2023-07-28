import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Navbar() {
    const address = useAddress();
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div>
                    <Link href="/">
                        <h3>Artwork</h3>
                    </Link>
                </div>
                <div>
                    {!address ? (
                        <ConnectWallet
                            btnTitle="Login"
                        />
                    ) : (
                        <Link href={`/profile/${address}`}>
                        <img 
                            src="https://avatars.githubusercontent.com/u/81866624?v=4" 
                            alt="avatar" 
                            className={styles.avatar}
                        />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}