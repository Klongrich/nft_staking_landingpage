import { useEffect, useState } from "react";
import styled from "styled-components";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Image from "next/image";

const Header = styled.div`
    background-color: #F4A7A7;
    height: 40px;
    width: 100%;
    margin-top: 0px;
`

const Container = styled.div`
    background-color: #CDA3A6;
    width: 100%;
    margin-top: -40px;

    height: 100%;

    h2 {
        width: 250px;
        height: 42px;
        font-family: Roboto;
        font-size: 48px;
        line-height: 45px;
        margin-left: 30px;
        padding-top: 40px;
        padding-bottom: 20px;
        text-decoration: underline;
    }
`

const PictureContainer = styled.div`
    text-align: center;
    margin-top: 110px;
`

const NoNFTSContainer = styled.div`
    margin-top: -70px;
    padding: 30px;
    font-size: 26px;

    ul {
        list-style-type: none;
        padding-bottom: 15px;
    }

    li {
        padding-top: 5px;
        padding-bottom: 5px;
        margin-left: -36px;
    }

    line-height: 1.5;
`

const PictureBox = styled.div`
    width: 150px;
    height: 150px;

    display: inline-block;
`

const SpinnerBox = styled.div`
    p {
        padding: 50px;
        font-size: 24px;
        font-weigth: bolder;
        line-height: 1.8
    }

    padding-bottom: 500px;
`

const LOL = styled.div`
    text-align: center;
    background-color: black;
    color: white;
    padding-top: 8px;
    padding-bottom: 8px;
`

const PartnersBox = styled.div`
    text-align: center;

    margin-top: 40px;

    img {
        border: 2px solid black;
        border-radius: 10px;
    }

    a {
        display: inline-block;
        margin-left: 15px;
        margin-right: 15px;
    }

    p {
        font-size: 20px;
    }

`

var ImageList = [{ image: "" }];

//Fix so that if pulls NFTs once the user connects or reconnects to meta-mask.
export function Account({ userAddress, web3 }: any) {

    const [hasNFTs, setHashNFTs] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    function checkIPFShash(imageURL: any) {
        var temp = imageURL.substring(0, 4);

        if (temp == "ipfs") {
            var rawIPFShash = imageURL.substring(7, 53);
            return ("https://ipfs.io/ipfs/" + rawIPFShash);
        } else {
            return (imageURL);
        }
    }

    async function getUserNFTs() {

        const web3 = createAlchemyWeb3(
            "https://eth-mainnet.alchemyapi.io/v2/UEzIhzfQD4trLHLg2IxfwwukrxfoYk-Q",
        );

        let nfts;

        try {
            const tempNFTs = await web3.alchemy.getNfts({ owner: userAddress })
            nfts = tempNFTs;
        } catch {
            console.log("alchemy API call errror");
            alert("Alchemy API Error");
        }

        //  Checks if Users given wallet address has any NFTs returned from AlchemyWeb3 call
        if (nfts) {
            if (nfts.ownedNfts.length <= 0) {
                setHashNFTs(false);
                return (0);
            }
        } else {
            console.log("NFTs not returend from Alchemey Call");
            alert("No Alchemy Data");
        }

        const storage = getStorage();
        //This is just a test array, idea is to query for tokenIDs from alchemy then create calls to qurey the images.
        let tokenIDArray = [1, 10, 1000, 950, 402, 35, 18, 106, 409];

        //Resetting ImageList
        ImageList = [{ image: "" }];

        for (let i = 0; i < tokenIDArray.length; i++) {
            const imagesRef = ref(storage, "/ChubbiFrens/chubbi" + tokenIDArray[i] + ".png")
            console.log(tokenIDArray[i])

            //Retreive the ImageURL through firbase using anaymouns AUTH
            var _URL = "";

            try {
                _URL = await getDownloadURL(imagesRef);
            } catch {
                console.log("Firebase API Error");
                alert("Firebase API Error");
            }

            var temp = {
                image: _URL
            }

            ImageList.push(temp);
        }

        setHasLoaded(true);

        if (nfts) {
            console.log(nfts.ownedNfts);
        }
    }

    function uploadNFTImages() {
        console.log("Hello World");
        // 'file' comes from the Blob or File API
    }

    useEffect(() => {
       // getUserNFTs();
    }, [])

    return (
        <>
            <Header />
            <Container>
                <h2> User NFTs </h2>
                <PictureContainer>
                    {hasNFTs && hasLoaded && <>
                        {ImageList.map((data) =>
                            <>
                                {data.image != null && data.image != "" && <>
                                    <PictureBox>
                                        <Image src={checkIPFShash(data.image)} alt='' height={120} width={120} />
                                    </PictureBox>
                                </>}
                            </>
                        )}

                    </>}
                    {hasNFTs && !hasLoaded && <>
                        <SpinnerBox>
                            <Image src={"/ColoredSpinner2.gif"} alt='' height={170} width={170} />
                            <p> Loading User NFTs ...... Please Wait .......</p>
                        </SpinnerBox>
                    </>}
                </PictureContainer>
                {!hasNFTs &&
                    <>
                        <NoNFTSContainer>
                            <p> This Account does not have any NFTs yet! </p>

                            <p> Purchase one today from our partners.</p>

                            <PartnersBox>
                            <a href="https://opensea.io">
                                <img src="/opensea_logo.png" alt="" height={190} width={190} />
                                <p>OpenSea</p>
                            </a>

                            <a href="https://looksrare.org">
                                <img src="/LooksRareLogo.jpeg" alt="" height={190} width={190} />
                                <p>Looks Rare</p>
                            </a>

                            <a href="https://zora.co">
                                <img src="/Zora.jpeg" alt="" height={190} width={190} />
                                <p>Zora</p>
                            </a>

                            <a href="https://rarible.com">
                                <img src="/RaribleLogo.png" alt="" height={190} width={190} />
                                <p>Rarible</p>
                            </a>
                            </PartnersBox>

                                {/* <a href="https://rarible.com/"><li>rareabile</li> </a>
                                <a href="https://zora.co/"><li>Zora </li> </a>
                                <a href="https://looksrare.org/"><li>Looks Rare </li></a> */}


                            <p> Or Disconnect Web3 wallet and connect to one with NFTs</p>
                        </NoNFTSContainer>
                    </>
                }
            </Container>

            <LOL>
                <p> Hello World </p>
            </LOL>
        </>
    )
}

export default Account;