import { useEffect, useState } from "react";
import styled from "styled-components";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Image from "next/image";

const Header = styled.div`
    background-color: #F4A7A7;
    height: 40px;
    width: 100%;
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

        :hover {
            cursor: pointer;
            color: grey;
        }
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

    margin-top: -90px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 50px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    height: 420px;

    overflow: hidden;
`

const PictureBox = styled.div`
    width: 150px;
    height: 150px;

    margin-left: 42px;
    margin-right: 42px;

    margin-top: 30px;

    border: 4px solid ${(props) => props.color};
    border-radius: 20px;

    display: inline-block;

    :hover {
        box-shadow: 0 0 10px black;
        cursor: pointer;
        transition-timing-function: ease-in;
        transition: 0.2s;
        transform: scale(1.03);
    }

    overflow: hidden;
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

    margin-top: -90px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 50px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    height: 350px;

`

const StakingMetaBox = styled.div`
    background-color: #CD8285;
    border-radius: 20px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: inline-block;

    padding-bottom: 0px;
`

const ActionButton = styled.div`
background-color: ${(props) => props.color};

width: 190px;
height: 25px;

text-align: center;

font-size: 22px;
margin-top: 20px;
margin-left: -20px;
padding: 10px;

border: 1 solid black;

box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

:hover {
    background-color: #FDC8C7;
    cursor: pointer;
}

display: inline-block;


`

const SelectedActionButton = styled.div`
background-color: ${(props) => props.color};

width: 190px;
height: 25px;

text-align: center;

font-size: 22px;
margin-top: 20px;
margin-left: -20px;
padding: 10px;

border: 2px solid blue;

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

const FilterBar = styled.div`
    height: 40px;
    margin-top: -30px;
`

var ImageList = [{ image: "", tokenID: "", collection: "", selected: false}];

var SelectedNFTs = [
    {
        Collection : "holder",
        tokenID : "0"
    }
];

var UserNFTs = [{ image: "", tokenID: "", collection: "", selected: false}];

//Fix so that if pulls NFTs once the user connects or reconnects to meta-mask.
export function Account({ userAddress, web3 }: any) {

    const [hasNFTs, setHashNFTs] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [userNFTs, setUserNFTs] = useState(UserNFTs);
    const [selectedNFTs, setSelectedNFTs] = useState(SelectedNFTs);

    const [perDay, setPerDay] = useState(100);
    const [claimAmount, setClaimAmount] = useState("");

    const [amountSelected, setAmountSelected] = useState(0);
    const [stakeSelected, setStakeSelected] = useState(false);

    function checkIPFShash(imageURL: any) {
        var temp = imageURL.substring(0, 4);

        if (temp == "ipfs") {
            var rawIPFShash = imageURL.substring(7, 53);
            return ("https://ipfs.io/ipfs/" + rawIPFShash);
        } else {
            return (imageURL);
        }
    }

    //Calculate how much a NFT will earn per day with the contract address and tokenID
    //Passed as paramters, selected will tell you if your adding or subtracting
    //These are dev notes for people trying to read this I guess
    function updateEarningsPerDay(collection : any, tokenID : any, selected: any) {
        if (selected) {
            setPerDay(perDay + 1);
        } else {
            setPerDay(perDay - 1);
        }
    }

    function selectAllNFTs(){
        let newArray = [...userNFTs];

        if (!stakeSelected) {
            for (let i = 0; i < userNFTs.length; i++) {
                newArray[i].selected = true;
            }
            setUserNFTs(newArray);
            setPerDay(userNFTs.length + 90)
            setStakeSelected(true);
            setAmountSelected(userNFTs.length - 1);
        } else {
            for(let i = 0; i < userNFTs.length; i++) {
                newArray[i].selected = false
            }
            setUserNFTs(newArray);
            setPerDay(0)
            setStakeSelected(false);
            setAmountSelected(0);
        }
    }

    async function updateSelectedNFTs(tokenID : string, collection : string, index : number, image: string, selected: boolean) { 
        let updatedArray = [...userNFTs];

        updatedArray[index] = {
            image : image,
            tokenID: tokenID,
            collection: "hey",
            selected: selected
        };

        updateEarningsPerDay(collection, tokenID, selected);
        setUserNFTs(updatedArray);

        if (!selected) {
            let tempCheck = amountSelected - 1;
            if (tempCheck <= 0) {
                setStakeSelected(false);
            }
            setAmountSelected(amountSelected - 1);
        } else {
            setAmountSelected(amountSelected + 1)
            setStakeSelected(true);
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
        let tokenIDArray = [10, 1000, 950, 402, 35, 18, 106, 409, 714, 21];

        //Resetting ImageList
        ImageList = [{ image: "" , tokenID: "", collection: "", selected: false}];

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
                image: _URL,
                tokenID : tokenIDArray[i].toString(),
                collection : "0x42f1654B8eeB80C96471451B1106b63D0B1a9fe1",
                selected : false
            }

            ImageList.push(temp);
        }

        setUserNFTs(ImageList);
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

                <FilterBar>
                <ul>
                    <li onClick={() => selectAllNFTs()}>Select All</li>
                    <li>Collections (5) </li>
                    <li>NFTs (150)</li>
                </ul>
                </FilterBar>

                <PictureContainer>
                    {hasNFTs && <>

                        {hasLoaded &&  <>

                            <NFTImagesBox>
                            {userNFTs.map((data, index) =>
                                <>
                                    {data.image != null && data.image != "" && <>
                                        {!data.selected && <>
                                        <PictureBox color={"black"}
                                                    onClick={() => updateSelectedNFTs(data.tokenID, data.collection, index, data.image, true)}>
                                            <Image src={checkIPFShash(data.image)} alt='' height={180} width={180} />
                                        </PictureBox>
                                        </>}


                                        {data.selected && <>
                                        <PictureBox color={"blue"}
                                                    onClick={() => updateSelectedNFTs(data.tokenID, data.collection, index, data.image, false)}>
                                            <Image src={checkIPFShash(data.image)} alt='' height={180} width={180} />
                                        </PictureBox>
                                        </>}
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
                                    <li>${perDay} / Day</li>
                                    <li>${(perDay * 7)} / Week</li>
                                    <li>${(perDay * 30)} / Month </li>
                                </ul>

                                {!stakeSelected && <>
                                    <ActionButton color={"#F4A7A7"}> Stake </ActionButton>
                                </>}

                                {stakeSelected && <>
                                    <SelectedActionButton color={"#FDC8C7 "}> Stake </SelectedActionButton>
                                </>}

                            </MetaBox>

                            <MetaBox>
                                <h3> Current Earnings: </h3>

                                <ul>
                                    <li>$24.17 / Day</li>
                                    <li>$170.12 / Week</li>
                                    <li>650.12 / Month </li>
                                </ul>

                                <ActionButton color={"#F4A7A7"}> Unstake </ActionButton>
                            </MetaBox>

                            <MetaBox>
                                <h3> Amount To Claim:</h3>

                                <ul>
                                    <li> ----------------------- </li>
                                    <li> | | | $134,020.42 | | | </li>
                                    <li> ----------------------- </li>
                                </ul>

                                <ActionButton color={"#F4A7A7"}> Claim </ActionButton>
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