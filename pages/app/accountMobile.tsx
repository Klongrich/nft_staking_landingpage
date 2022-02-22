import { useEffect, useState } from "react";
import styled from "styled-components";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";

import Spinner from "./coloredSpinner.gif";


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
    text-decoration: underline;
}


`

const PictureContainer = styled.div`

text-align: center;
margin-top: 110px;


`

const NoNFTSContainer = styled.div`

    padding: 30px;

    ul {
        list-style-type: none;
    }

    li {
        padding-top: 5px;
        padding-bottom: 5px;
    }

`

const PictureBox = styled.div`
    width: 150px;
    height: 150px;

    display: inline-block;
`

var ImageList = [{ image: "" }];

//Fix so that if pulls NFTs once the user connects or reconnects to meta-mask.
export function Account({ userAddress, web3 }: any) {

    const [hasNFTs, setHashNFTs] = useState(true);
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

        const nfts = await web3.alchemy.getNfts({ owner: userAddress })

        // if (nfts.ownedNfts.length <= 0) {
        //     alert("No NFTs found");
        //     setHashNFTs(false);
        //     return (0);
        // }

        const storage = getStorage();
        //This is just a test array, idea is to query for tokenIDs from alchemy then create calls to qurey the images.
        let tokenIDArray = [0, 10, 1000, 1001, 1002, 1005, 1008, 1006, 1009];

        //Resetting ImageList
        ImageList = [{ image: "" }];

        for (let i = 0; i < tokenIDArray.length; i++) {
            const imagesRef = ref(storage, tokenIDArray[i] + ".png")
            console.log(tokenIDArray[i])

            //Retreive the ImageURL through firbase using anaymouns AUTH
            var _URL = await getDownloadURL(imagesRef);

            var temp = {
                image: _URL
            }

            ImageList.push(temp);
        }

        setHasLoaded(true);
        console.log(nfts.ownedNfts);
    }

    useEffect(() => {
        getUserNFTs();
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
                                <PictureBox>
                                    {data.image != null && data.image != "" && <>
                                        <Image src={checkIPFShash(data.image)} alt='' height={120} width={120} />
                                    </>}
                                </PictureBox>

                            </>
                        )}

                    </>}
                    {hasNFTs && !hasLoaded && <>
                        <div>
                            <Image src={"/coloredSpinner.gif"} alt='' height={170} width={170} />
                            <p> Loading User NFTs ... Please Wait .......</p>
                        </div>
                    </>}
                </PictureContainer>
                {!hasNFTs &&
                    <>
                        <NoNFTSContainer>
                            <p> This Account Does not have any NFTs yet! </p>

                            <p> Purchase one today from our partners!</p>

                            <ul>
                                <a href="https://opensea.io"><li>opensea</li> </a>
                                <a href="https://rarible.com/"><li>rareabile</li> </a>
                                <a href="https://zora.co/"><li>Zora </li> </a>
                                <a href="https://looksrare.org/"><li>Looks Rare </li></a>
                            </ul>

                            <p> Or Disconnect Web3 wallet and connect to one with NFTs</p>
                        </NoNFTSContainer>
                    </>
                }
            </Container>
            <p> Hello World </p>
        </>
    )
}

export default Account;