import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
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

        <div className={styles.grid}>
          <a href="https://rainbowkit.com" className={styles.card}>
            <h2>Mint Your Health NFT &rarr;</h2>
          </a>

          
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
