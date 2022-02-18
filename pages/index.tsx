import type { NextPage } from 'next';
import { useEffect, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import LandingPage from "./landing_page";
import MobileLandingPage from "./mobile_landing_page";

const Home: NextPage = () => {

  const [width, setWidth] = useState(0.00);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width])

  return (
    <>
      <Head>
        <title>nft.staking</title>
        <meta name="nft.staking" content="Landing page for the nft.staking dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {width > 999 &&
        <div className={styles.container}>
          <LandingPage />
        </div>
      }

      {width < 999 &&
        <div>
          <MobileLandingPage />
          <div className={styles.helloWorld}>
            <h2> Hello World </h2>
          </div>
        </div>
      }
    </>
  )
}

export default Home
