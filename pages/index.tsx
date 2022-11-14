import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  useConnect,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import contractInterface from '/metacare/smart-contract/contracts/abi.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';

const contractConfig = {
  addressOrName: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
  contractInterface: contractInterface,
};

const Home: NextPage = () => {

  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useConnect();

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
  } = useContractWrite(contractConfig, 'mint');

  const { data: totalSupplyData } = useContractRead(
    contractConfig,
    'totalSupply',
    { watch: true }
  );

  const { isSuccess: txSuccess } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

  const isMinted = txSuccess;

  return (
    <div className={styles.container}>
      <Head>
        <title>MetaCare</title>
        <meta
          name="description"
          content="Your Health Data On-Chain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       
      <img
                src={"metacarelogo.JPG"}
                width="125px"
                height="125px"
                alt=""
              />
        <h1 className={styles.title}>
          Welcome to <span style={{color:"#183D9F"}}>Meta</span><span style={{color:"#1B9CE5"}}>Care</span>!
        </h1>

        <p className={styles.description}>
        <h3 style={{color:"#183D9F"}}>A Blockchain-based Healthcare Data Management Solution.</h3>
        <h3 style={{color:"#183D9F"}}>Track your data. Share it with your doctor. Improve yout global health.</h3>
        </p>
        <img
                src={"blue-men.JPG"}
                width="350px"
                height="700px"
                alt=""
              />
        <h2>Step 1: Connect your wallet</h2>
        <ConnectButton />
        
        {isConnected && !isMinted && (
              <button
                style={{ marginTop: 24 }}
                disabled={isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() => mint()}
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Mint'}
              </button>
            )}

        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h2>Mint Your Health NFT &rarr;</h2>
          </a>

          
        </div>

        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={isMinted}>
              <Image
                layout="responsive"
                src="/nft.png"
                width="500"
                height="500"
                alt="RainbowKit Demo NFT"
              />
              <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
              <ConnectButton />
            </FrontCard>
            <BackCard isCardFlipped={isMinted}>
              <div style={{ padding: 24 }}>
                <Image
                  src="/nft.png"
                  width="80"
                  height="80"
                  alt="RainbowKit Demo NFT"
                  style={{ borderRadius: 8 }}
                />
                <h2 style={{ marginTop: 24, marginBottom: 6 }}>NFT Minted!</h2>
                <p style={{ marginBottom: 24 }}>
                  Your NFT will show up in your wallet in the next few minutes.
                </p>
                <p style={{ marginBottom: 6 }}>
                  View on{' '}
                  <a href={`https://rinkeby.etherscan.io/tx/${mintData?.hash}`}>
                    Etherscan
                  </a>
                </p>
                <p>
                  View on{' '}
                  <a
                    href={`https://testnets.opensea.io/assets/rinkeby/${mintData?.to}/1`}
                  >
                    Opensea
                  </a>
                </p>
              </div>
            </BackCard>
          </FlipCard>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/meta-care" target="_blank" rel="noopener noreferrer">
          Made with 💙   by some frens
        </a>
      </footer>
    </div>
  );
};

export default Home;
