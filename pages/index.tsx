import React from 'react';
import AnimatedText from 'react-animated-text-content';
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
//import contractInterface from '../smart-contract/contracts/abi.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';
import { useAccount, usePrepareContractWrite } from 'wagmi';

const Home: NextPage = () => {
  const { isConnected } = useAccount();

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

      <h1 className={styles.title} style={{color:"#0093FF"}}>    
          Welcome to METACARE
        </h1>
      <img
                src={"metacarev2cropped.png"}
                width="333px"
                height="337px"
                alt=""
                style={{float: "left"}}
              />
         
         

        <p className={styles.description}>
        <h2 style={{color:"#091562"}}>A Blockchain-based Healthcare <br></br>Data Management Solution.</h2>
        <h5 style={{color:"#091562"}}>
        <AnimatedText
          type="words" // animate words or chars
          animation={{
            x: '200px',
            y: '-20px',
            scale: 1.1,
            ease: 'ease-in-out',
          }}
          animationType="lights"
          interval={0.06}
          duration={0.8}
          tag="p"
          className="animated-paragraph"
          includeWhiteSpaces
          threshold={0.1}
          rootMargin="20%"
        >
        Track your data. Share it with your doctor. Improve your global health.
        </AnimatedText>
        </h5>
        </p>
        <img className={styles.img}
                src={"blue-men.JPG"}
                width="350px"
                height="700px"
                alt=""
                style={{float: "left"}}
              />
        
        
        <h2>Step 1: Connect your wallet</h2>
        <ConnectButton />
        <p></p>
        {isConnected &&(
      
        <button className={styles.button}>
             Mint your Health NFT
        </button>
        )}
        
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/meta-care" target="_blank" rel="noopener noreferrer">
          Made with <img
                src={"heartbeat.gif"}
                width="23px"
                height="23px"
                alt=""
              />   by some frens  
        </a>
      </footer>
    </div>
  );
};

export default Home;
