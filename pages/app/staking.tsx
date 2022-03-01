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

    padding-bottom: 50px;

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

    ul {
        list-style-type: none;
        margin-left: 120px;
    }

    li {
        float: left;
        padding-left: 15px;
        padding-right: 15px;

        font-size: 22px;
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

const NFTImagesBox = styled.div`
    background-color: #CD8285;

    margin-top: -20px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 50px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

`

const PictureBox = styled.div`
    width: 150px;
    height: 150px;

    margin: 42px;

    border: 2px solid black;
    border-radius: 20px;

    display: inline-block;

    :hover {
        border: 2px solid blue;
    }
`



const SpinnerBox = styled.div`
    p {
        padding: 50px;
        font-size: 24px;
        font-weigth: bolder;
        line-height: 1.8
    }

    background-color: #CD8285;

    padding-top: 50px;

    margin-top: -20px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 50px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

`

const StakingMetaBox = styled.div`
    background-color: #CD8285;
    border-radius: 20px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: inline-block;

    padding-bottom: 30px;


`

const ActionButton = styled.div`
background-color: #F4A7A7;

width: 190px;
height: 25px;

text-align: center;

font-size: 22px;
margin-top: 20px;
margin-left: -20px;
padding: 10px;

border: 1px solid black;

box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

:hover {
    background-color: #FDC8C7;
    cursor: pointer;
}

display: inline-block;


`

const MetaBox = styled.div`
    text-align: center;
    float: left;

    h3 {
        padding-top: 20px;
        font-size: 28px;
    }

    height: 350px;
    width: 530px;

    li {
        float: none;
        text-align: left;

        font-size: 24px;

        padding-top: 8px;
        padding-bottom: 8px;
    }

`

const LOL = styled.div`
    text-align: center;
    background-color: black;
    color: white;
    padding-top: 8px;
    padding-bottom: 8px;
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
        let tokenIDArray = [1, 10, 1000, 950, 402, 35, 18, 106, 409, 714];

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

    useEffect(() => {
        getUserNFTs();
    }, [])

    return (
        <>
            <Header />
            <Container>
                <h2> User NFTs </h2>

                <ul>
                    <li>Select All</li>
                    <li>Collections (5) </li>
                    <li>NFTs (150)</li>
                </ul>

                <PictureContainer>
                    {hasNFTs && <>

                        {hasLoaded &&  <>

                            <NFTImagesBox>
                            {ImageList.map((data) =>
                                <>
                                    {data.image != null && data.image != "" && <>
                                        <PictureBox>
                                            <Image src={checkIPFShash(data.image)} alt='' height={180} width={180} />
                                        </PictureBox>
                                    </>}
                                </>)}
                            </NFTImagesBox>

                        </>}


                        {!hasLoaded && <>
                            <SpinnerBox>
                                <Image src={"/ColoredSpinner2.gif"} alt='' height={170} width={170} />
                                <p> Loading User NFTs ...... Please Wait .......</p>
                            </SpinnerBox>
                        </>}

                        <StakingMetaBox>

                            <MetaBox>
                                <h3> Estaminted Earnings: </h3>

                                <ul>
                                    <li>$24.17 / Day</li>
                                    <li>$170.12 / Week</li>
                                    <li>650.12 / Month </li>
                                </ul>

                                <ActionButton> Stake </ActionButton>
                            </MetaBox>

                            <MetaBox>
                                <h3> Current Earnings: </h3>

                                <ul>
                                    <li>$24.17 / Day</li>
                                    <li>$170.12 / Week</li>
                                    <li>650.12 / Month </li>
                                </ul>

                                <ActionButton> Unstake </ActionButton>
                            </MetaBox>

                            <MetaBox>
                                <h3> Amount To Claim:</h3>

                                <ul>
                                    <li> -------------------- </li>
                                    <li> $134,020.42 </li>
                                    <li> -------------------- </li>
                                </ul>

                                <ActionButton> Claim </ActionButton>
                            </MetaBox>

                        </StakingMetaBox>

                    </>}
                </PictureContainer>

                {!hasNFTs &&
                    <>
                        <NoNFTSContainer>
                            <p> This Account does not have any NFTs yet! </p>

                            <p> Purchase one today from our partners.</p>

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

            <LOL>
                <p> Hello World </p>
            </LOL>
        </>
    )
}

export default Account;