import { useEffect, useState } from "react";
import styled from "styled-components";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import SampleABI from "./Staking.json"

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Image from "next/image";
import ProgressBar from "./progressBar";

const ONE_ETHER = 1000000000000000000;

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

const AllNFTImagesBox = styled.div`
    background-color: #CD8285;

    margin-top: -90px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 50px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    padding-bottom: 20px;

    h4 {
        font-size: 20px;
        text-decoration: underline;
        text-align: right;
        margin-right: 50px;
        margin-bottom: 10px;

        :hover {
            cursor: pointer;
        }
    }

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

    h4 {
        position: absolute;
        top: 575px;
        left: 89%;

        text-decoration: underline;
        font-size: 20px;

        :hover {
            cursor: pointer;
        }
    }
`

const NONFTImagesBox = styled.div`
    background-color: #CD8285;

    margin-top: -90px;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 50px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    height: 420px;

    padding-top: 10px;

    h3 {
        padding-top: 0px;
        text-align: center;
        font-size: 25px;
    }
`

const PictureBox = styled.div`
    width: 150px;
    height: 150px;

    margin-left: 42px;
    margin-right: 42px;

    margin-top: 35px;

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

const CollectionBox = styled.div`
    width: 150px;
    height: 150px;

    margin-left: 58px;
    margin-right: 58px;

    margin-top: 120px;

    border: 4px solid black;

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
        padding-top: 20px;
        padding-bottom: 50px;
        padding-left: 50px;
        padding-right: 50px;
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

const StakingMetaBoxNONFTS = styled.div`
    background-color: #CD8285;
    border-radius: 20px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: inline-block;

    margin-left: 90px;

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

const PartnersBox = styled.div`
    text-align: center;

    margin-top: 40px;

    img {
        border: 2px solid black;
        border-radius: 10px;
    }

    a {
        display: inline-block;
        margin-left: 45px;
        margin-right: 45px;
    }

    p {
        font-size: 20px;
    }
`

const ProgressBarWrapper = styled.div`
    width: 500px;
    display: inline-block;
    padding-right: 100px;

    p {
        margin-top: -50px;
        margin-left: 82px;
    }
`

var ImageList = [{ metadata: {image: ""}, tokenID: "", collection: "", selected: false}];

var SelectedNFTs = [
    {
        Collection : "holder",
        tokenID : "0"
    }
];

var UserNFTs = [{ image: "", tokenID: "", collection: "", selected: false}];

//Fix so that if pulls NFTs once the user connects or reconnects to meta-mask.
export function Account({ userAddress, web3, provider }: any) {

    const [hasNFTs, setHashNFTs] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [userNFTs, setUserNFTs] = useState(UserNFTs);
    const [selectedNFTs, setSelectedNFTs] = useState(SelectedNFTs);

    const [perDay, setPerDay] = useState(100);
    const [claimAmount, setClaimAmount] = useState("");

    const [amountSelected, setAmountSelected] = useState(0);
    const [stakeSelected, setStakeSelected] = useState(false);

    const [displayAll, setDisplayAll] = useState(false);
    const [totalNFTs, setTotalNFTs] = useState(0);
    const [loadedNFTs, setLoadedNFTs] = useState(0);

    const [progress, setProgress] = useState(0);

    const [userCollections, setUserCollections] = useState([{image: "/collections/azuki.jpg"}])
    const [showCollections, setShowCollections] = useState(false);
    const [userCollectionTotal, setUserCollectionTotal] = useState(0);

    const [userNFTsTotal, setUserNFTsTotal] = useState(0);
    const [userChubbisTotal, setUserChubbisTotal] = useState(0);

    const [AlchemeyData, setAlchemeyData] = useState([{metadata: {image : ""}, tokenID : "", collection: "", selected: false }]);
    const [hasWallet, setHasWallet] = useState(false);


    const [chubbisLoading, setChubbisLoading] = useState(false);
    const [totalChubbis, setTotalChubbis] = useState(0);
    const [loadedChubbis, setLoadedChubbis] = useState(0);

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
        let newArray = [...AlchemeyData];

        if (!stakeSelected) {
            for (let i = 0; i < AlchemeyData.length; i++) {
                newArray[i].selected = true;
            }
            setAlchemeyData(newArray);
            setPerDay(AlchemeyData.length + 90)
            setStakeSelected(true);
            setAmountSelected(AlchemeyData.length - 1);
        } else {
            for(let i = 0; i < AlchemeyData.length; i++) {
                newArray[i].selected = false
            }
            setAlchemeyData(newArray);
            setPerDay(0)
            setStakeSelected(false);
            setAmountSelected(0);
        }
    }

    async function updateSelectedNFT(tokenID : string, collection : string, index : number, image: string, selected: boolean) { 
        let updatedArray = [...AlchemeyData];

        updatedArray[index] = {
            metadata : {image : image},
            tokenID: tokenID,
            collection: "Chubbiverse Frens",
            selected: selected
        };

        updateEarningsPerDay(collection, tokenID, selected);
        setAlchemeyData(updatedArray);

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

    async function submit_stake() {
        // if (web3.currentProvider.networkVerison === "1") {
        //     console.log("Connected To Mainnet Network");
        //     alert("Switch To Rinkey Testnet")
        // }

        // console.log("provider: " + web3.currentProvider.networkVerison);

        // if (web3.currentProvider.networkVerison === "4") {
        //     console.log("Connected To Rinkeby Network");

        //     const Ethaccounts = await web3.eth.getAccounts();

        //     const SampleContract = new web3.eth.Contract(
        //         SampleABI.abi,
        //         "0x4D43b5457835144cAf1D3aC526eFB75D44651218"
        //     );

        //     await SampleContract.methods
        //     .stake_eth()
        //     .send({ from: Ethaccounts[0], value: (0.0001 *  ONE_ETHER)})
        //     .once("receipt", (receipt : any) => {
        //         console.log(receipt);
        //         console.log("transaction hash" + receipt.transactionHash);
        //     });
        // }

        const Ethaccounts = await web3.eth.getAccounts();

        const SampleContract = new web3.eth.Contract(
            SampleABI.abi,
            "0x4D43b5457835144cAf1D3aC526eFB75D44651218"
        );

        await SampleContract.methods
        .stake_eth()
        .send({ from: Ethaccounts[0], value: (0.0001 *  ONE_ETHER)})
        .once("receipt", (receipt : any) => {
            console.log(receipt);
            console.log("transaction hash" + receipt.transactionHash);
        });
    }


    function getLoadingIncerment(totalNFTs : any) {
        console.log("Incerment: " + ((1 / totalNFTs) * 100));
        return((1 / totalNFTs) * 100);
    }

    function loadUserCollections() {
        if (showCollections) {
            setShowCollections(false);
        } else {

            let _CollectionDataExample = [
                {
                    image: "/collections/azuki.jpg"
                },
                {
                    image: "/collections/BAYC.png"
                },
                {
                    image: "/collections/coolcats.jpg"
                },
                {
                    image: "/collections/CryptoChicks.jpg"
                },
                {
                    image: "/collections/CryptoCoven.jpg"
                }
            ];

            setUserCollections(_CollectionDataExample);
            setShowCollections(true);
        }
    }

    function _zeroTotals() {
        setUserNFTsTotal(0);
        setUserCollectionTotal(0);
        setUserChubbisTotal(0);
    }

    async function getAlchemyData() {
        if (userAddress) {
            try {
                const web3 = createAlchemyWeb3(
                    "https://eth-mainnet.alchemyapi.io/v2/UEzIhzfQD4trLHLg2IxfwwukrxfoYk-Q",
                );
                const userNFTs = await web3.alchemy.getNfts({ owner: "0xA7f71DbB40a67e410860171D287E7B45Df64180F"});

                if (userNFTs) {
                    if (userNFTs.ownedNfts.length <= 0) {
                        setHashNFTs(false);
                        _zeroTotals();
                        return (0);
                    }

                    for(let i = 0; i < userNFTs.ownedNfts.length; i++) {
                        //@ts-ignore
                        console.log("ImageURL: " + userNFTs.ownedNfts[i].metadata.image);
                    }
                    //@ts-ignore
                    setAlchemeyData(userNFTs.ownedNfts);
                    setUserNFTsTotal(userNFTs.ownedNfts.length);
                    console.log(userNFTs.ownedNfts);
                    setHasLoaded(true);
                    setHashNFTs(true);
                } else {
                    console.log("NFTs not returend from Alchemey Call");
                    alert("No Alchemy Data");
                }
            } catch {
                console.log("Alchemy Error");
                alert("Alchemey Error");
            }
        }
    }


    async function getAlchemyDataChubbis(userAddress : any) {
        if (userAddress) {
            try {
                const web3 = createAlchemyWeb3(
                    "https://eth-mainnet.alchemyapi.io/v2/UEzIhzfQD4trLHLg2IxfwwukrxfoYk-Q",
                );

                const userNFTs = await web3.alchemy.getNfts({ owner: userAddress, contractAddresses: ["0x42f1654b8eeb80c96471451b1106b63d0b1a9fe1"] });

                if (userNFTs) {
                    if (userNFTs.ownedNfts.length <= 0) {
                        setHashNFTs(false);
                        _zeroTotals();
                        return (0);
                    }
                    //@ts-ignore

                    //Resetting ImageList
                    ImageList = [{ metadata: { image: ""} , tokenID: "", collection: "", selected: false}];

                    for (let i = 0; i < userNFTs.ownedNfts.length; i++) {
                        //@ts-ignore
                        let _URL = userNFTs.ownedNfts[i].metadata.image;
                        //@ts-ignore
                        let _tokenID = userNFTs.ownedNfts[i].id.tokenId;

                        var temp = {
                            metadata : { image: _URL} ,
                            tokenID : _tokenID,
                            collection : "0x42f1654B8eeB80C96471451B1106b63D0B1a9fe1",
                            selected : false
                        }

                        ImageList.push(temp);
                    }
                    console.log(ImageList);
                    //@ts-ignore
                    setAlchemeyData(ImageList);
                    setUserChubbisTotal(userNFTs.ownedNfts.length);
                    console.log(userNFTs.ownedNfts);
                    setHasLoaded(true);
                    setHashNFTs(true);

                    const userNFTcount = await web3.alchemy.getNfts({owner: userAddress});
                    setUserNFTsTotal(userNFTcount.ownedNfts.length);

                } else {
                    console.log("NFTs not returend from Alchemey Call");
                    alert("No Alchemy Data");
                }
            } catch {
                console.log("Alchemy Error");
                alert("Alchemey Error");
            }
        }
    }

    async function getUserNFTs() {

        //let tokenIDArray = [10, 1000, 950, 402, 35, 18, 106, 409, 714, 82, 100, 42, 32, 84, 99, 304, 495];

        let tokenIDArray = [42];

        if (userAddress) {
            try {
                const web3 = createAlchemyWeb3(
                    "https://eth-mainnet.alchemyapi.io/v2/UEzIhzfQD4trLHLg2IxfwwukrxfoYk-Q",
                );
                const userNFTs = await web3.alchemy.getNfts({ owner: userAddress, contractAddresses: ["0x42f1654b8eeb80c96471451b1106b63d0b1a9fe1"] });

                if (userNFTs) {
                    if (userNFTs.ownedNfts.length <= 0) {
                        setHashNFTs(false);
                        _zeroTotals();
                        return (0);
                    }
                } else {
                    console.log("NFTs not returend from Alchemey Call");
                    alert("No Alchemy Data");
                }

                console.log(userNFTs.ownedNfts);
                setUserNFTsTotal(userNFTs.ownedNfts.length);

                let totalChubbis = userNFTs.ownedNfts.length;

                //Loop Through All The Users Chubbi NFTs
                for (let x = 0; x < userNFTs.ownedNfts.length; x++) {
                        tokenIDArray.push(parseInt(userNFTs.ownedNfts[x].id.tokenId, 16))
                }

                if (totalChubbis > 0) {
                    // const storage = getStorage();
                    // setTotalNFTs(tokenIDArray.length);
        
                    // //Resetting ImageList
                    // ImageList = [{ image: "" , tokenID: "", collection: "", selected: false}];
        
                    // for (let i = 0; i < tokenIDArray.length; i++) {
                    //     const imagesRef = ref(storage, "/ChubbiFrens/chubbi" + tokenIDArray[i] + ".png")
        
                    //     //Retreive the ImageURL through firbase using anaymouns AUTH
                    //     var _URL = "";
        
                    //     try {
                    //         _URL = await getDownloadURL(imagesRef);
                    //     } catch {
                    //         console.log("Firebase API Error");
                    //         alert("Firebase API Error");
                    //     }
        
                    //     var temp = {
                    //         image: _URL,
                    //         tokenID : tokenIDArray[i].toString(),
                    //         collection : "0x42f1654B8eeB80C96471451B1106b63D0B1a9fe1",
                    //         selected : false
                    //     }
        
                    //     ImageList.push(temp);
                    //     setLoadedNFTs(i);
                    // }
        
                    // setHasLoaded(true);
                    // setUserNFTs(ImageList);
                }

                console.log("total chubbis: " + totalChubbis);
                setTotalChubbis(totalChubbis);
                setHashNFTs(true);
            } catch {
                console.log("alchemy API call errror");
                alert("Alchemy API Error");
            }
        }
    }

    useEffect(() => {
        //getUserNFTs();
        //getAlchemyData();

        if (!userAddress) {
            setHasWallet(false);
            setHashNFTs(false);
        } else {
            getAlchemyDataChubbis(userAddress);
            //getAlchemyData();
            setHasWallet(true);
            provider.on("accountsChanged", (accounts: string[]) => {
                if (!accounts[0]) {
                    setHasWallet(false);
                    setHashNFTs(false);
                } else {
                    getAlchemyDataChubbis(accounts[0]);
                    //getAlchemyData();
                    setHasWallet(true);
                }
        });
    }
    }, [])

    return (
        <>
            <Header />
            <Container>
                <h2> User NFTs </h2>

                <FilterBar>
                <ul>
                    <li onClick={() => selectAllNFTs()}>Select All</li>
                    <li onClick={() => loadUserCollections()}>Collections ({userCollectionTotal}) </li>
                    <li onClick={() => console.log("Update To Pull All UsersNFTs")}>NFTs ({userNFTsTotal})</li>
                    <li onClick={() =>  getAlchemyDataChubbis(userAddress)}>Chubbis ({userChubbisTotal})</li>
                </ul>
                </FilterBar>

                <PictureContainer>
                    {hasNFTs && <>

                        {showCollections && hasLoaded && !displayAll && <>
                                <NFTImagesBox>
                                    {userCollections.map((data) =>
                                        <>
                                            <CollectionBox>
                                                <Image src={data.image} alt='' height={180} width={180} />
                                            </CollectionBox>
                                        </>
                                    )}
                                </NFTImagesBox>
                        </>}

                        {hasLoaded && !displayAll && !showCollections &&  <>
                            <NFTImagesBox>
                            <h4 onClick={() => setDisplayAll(true)}> See All </h4>
                            {AlchemeyData.map((data, index) =>
                                <>
                                    {data.metadata.image != null && data.metadata.image != "" && <>
                                        {/* <PictureBox color={"black"}>
                                            <Image src={checkIPFShash(data.metadata.image)} alt='' height={180} width={180} />
                                        </PictureBox> */}

                                        {!data.selected && <>
                                        <PictureBox color={"black"}
                                                    onClick={() => updateSelectedNFT(data.tokenID, data.collection, index, data.metadata.image, true)}>
                                            <Image src={checkIPFShash(data.metadata.image)} alt='' height={180} width={180} />
                                        </PictureBox>
                                        </>}


                                        {data.selected && <>
                                        <PictureBox color={"blue"}
                                                    onClick={() => updateSelectedNFT(data.tokenID, data.collection, index, data.metadata.image, false)}>
                                            <Image src={checkIPFShash(data.metadata.image)} alt='' height={180} width={180} />
                                        </PictureBox>
                                        </>}

                                    </>}
                                </>)}
                            </NFTImagesBox>
                        </>}

                        {hasLoaded && displayAll && !showCollections && <>
                            <AllNFTImagesBox>
                            {AlchemeyData.map((data, index) => <>
                                {data.metadata.image != null && data.metadata.image != "" && <>
                                        {/* <PictureBox color={"black"}>
                                            <Image src={checkIPFShash(data.metadata.image)} alt='' height={180} width={180} />
                                        </PictureBox> */}


                                {!data.selected && <>
                                    <PictureBox color={"black"}
                                                onClick={() => updateSelectedNFT(data.tokenID, data.collection, index, data.metadata.image, true)}>
                                        <Image src={checkIPFShash(data.metadata.image)} alt='' height={180} width={180} />
                                    </PictureBox>
                                </>}

                                {data.selected && <>
                                    <PictureBox color={"blue"}
                                                onClick={() => updateSelectedNFT(data.tokenID, data.collection, index, data.metadata.image, false)}>
                                        <Image src={checkIPFShash(data.metadata.image)} alt='' height={180} width={180} />
                                    </PictureBox>
                                    </>}
                                    </>}
                            </>)}

                        <h4 onClick={() => setDisplayAll(false)}> Close </h4>
                        </AllNFTImagesBox>

                    </>}

                        {!hasLoaded && <>
                            <SpinnerBox>
                                 <Image src={"/ColoredSpinner3.gif"} alt='' height={170} width={170} />
                                <br />
                                <ProgressBarWrapper>
                                    <ProgressBar bgcolor="#F4A7A7" progress={getLoadingIncerment(totalNFTs) * loadedNFTs} height={20} />
                                    <p> Loading all : {totalNFTs} / {loadedNFTs} </p>
                                </ProgressBarWrapper>
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
                                    <SelectedActionButton onClick={() => submit_stake()}
                                        color={"#FDC8C7 "}> Stake </SelectedActionButton>
                                </>}

                            </MetaBox>

                            <MetaBox>
                                <h3> Current Earnings: </h3>

                                <ul>
                                    <li>$24.17 / Day</li>
                                    <li>$170.12 / Week</li>
                                    <li>650.12 / Month </li>
                                </ul>

                                <ActionButton onClick={() => submit_stake()} color={"#F4A7A7"}> Unstake </ActionButton>
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
                        {hasWallet && <>
                        <NONFTImagesBox>
                            <h3> This Account does not have any ChubbiFrens NFTs yet! </h3>
                            <h3> Purchase one today from our partners. </h3>

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
                            <br /> <br />
                            </NONFTImagesBox>
                            </>}

                            {!hasWallet && <>
                                <NONFTImagesBox>
                                    <h3> No Wallet Found. Download One of Our Partners Below</h3>


                                </NONFTImagesBox>
                            </>}

                        <StakingMetaBoxNONFTS>

                            <MetaBox>
                                <br /> < br />
                                <h3> Estaminted Earnings: </h3>

                                <ul>
                                    <li>N / A</li>
                                </ul>

                                {!stakeSelected && <>
                                    <ActionButton color={"#F4A7A7"}> Stake </ActionButton>
                                </>}

                                {stakeSelected && <>
                                    <SelectedActionButton onClick={() => submit_stake()}
                                        color={"#FDC8C7 "}> Stake </SelectedActionButton>
                                </>}

                            </MetaBox>

                            <MetaBox>
                                    <br /> <br />
                                <h3> Current Earnings: </h3>

                                <ul>
                                    <li> N / A </li>
                                </ul>

                                <ActionButton onClick={() => submit_stake()} color={"#F4A7A7"}> Unstake </ActionButton>
                            </MetaBox>

                            <MetaBox>
                                    <br /> <br />
                                <h3> Amount To Claim:</h3>

                                <ul>
                                    <li> N / A </li>
                                </ul>

                                <ActionButton color={"#F4A7A7"}> Claim </ActionButton>
                            </MetaBox>

                        </StakingMetaBoxNONFTS>
                    </>}
            </Container>

            <LOL>
                <p> Hello World </p>
            </LOL>
        </>
    )
}

export default Account;

//To Do - (Today / Tommorow)

//Change Spinner Background-color
//Add Loader Bar under spinner circle
//Collections Display in Box
//Check Users Wallets For NFTs
//Update APP display on Desktop if the user Doesn't have NFTs

//Lanuch Smart Contracts