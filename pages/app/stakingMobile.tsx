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
        padding-bottom: 90px;
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

const AllNFTImagesBox = styled.div`
    background-color: #CD8285;

    margin-top: -90px;
    margin-left: 20px;
    margin-right: 20px;
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
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 50px;
    padding-bottom: 20px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    height: 340px;

    overflow: hidden;

    h4 {
        position: absolute;
        top: 583px;
        left: 70%;

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
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 50px;

    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    height: 100%;

    padding-top: 10px;

    padding-left: 15px;
    padding-right: 15px;

    h3 {
        padding-top: 0px;
        text-align: center;
        font-size: 25px;
    }
`

const PictureBox = styled.div`
    width: 110px;
    height: 110px;

    margin-left: 15px;
    margin-right: 15px;

    margin-top: 40px;

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
    margin-left: 20px;
    margin-right: 20px;
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

    width: 90%;

    margin-left: 20px;
    margin-right: 20px;

    ul {
        list-style-type: none;
    }

    li {
        margin-left: 60px;
    }

    p {
        font-size: 24px;
    }

    padding-bottom: 50px;
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

    height: 100%;
    width: 100%;

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
    height: 30px;
    margin-top: -20px;

    ul {
        list-style-type: none;
        margin-left: -20px;
    }

    li {
        float: left;
        padding-left: 8px;
        padding-right: 8px;

        font-size: 16px;

        :hover {
            cursor: pointer;
            color: grey;
        }
    }

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

var SelectedNFTs = [{ Collection : "holder", tokenID : "0" }];
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

    async function getAlchemyDataChubbis(userAddress : any) {
        if (userAddress) {
            try {
                const web3 = createAlchemyWeb3(
                    "https://eth-mainnet.alchemyapi.io/v2/UEzIhzfQD4trLHLg2IxfwwukrxfoYk-Q",
                );
                // const testAddress = "0x54BE3a794282C030b15E43aE2bB182E14c409C5e";
                const userNFTs = await web3.alchemy.getNfts({ owner: userAddress, contractAddresses: ["0x42f1654b8eeb80c96471451b1106b63d0b1a9fe1"] });
                if (userNFTs) {
                    if (userNFTs.ownedNfts.length <= 0) {
                        const allUserNFTs = await web3.alchemy.getNfts({owner: userAddress});
                        if (allUserNFTs.ownedNfts.length > 0) {
                            setUserNFTsTotal(allUserNFTs.ownedNfts.length);
                            //@ts-ignore
                            setAlchemeyData(allUserNFTs.ownedNfts);
                            setHasLoaded(true);
                            setHashNFTs(true);
                            return (0);
                        } else {
                            setHashNFTs(false);
                            _zeroTotals();
                            return (0);
                        }
                    }
                    //@ts-ignore
                    setAlchemeyData(userNFTs.ownedNfts);
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

    useEffect(() => {
        //getUserNFTs();
        //getAlchemyData();
        if (!userAddress) {
            setHasWallet(false);
            setHashNFTs(false);
            _zeroTotals();
        } else {
            getAlchemyDataChubbis(userAddress);
            //getAlchemyData();
            setHasWallet(true);
            provider.on("accountsChanged", (accounts: string[]) => {
                if (!accounts[0]) {
                    setHasWallet(false);
                    setHashNFTs(false);
                } else {
                    setHasLoaded(false);
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

                    {userNFTsTotal >= 100 && <li onClick={() => console.log("Update To Pull All UsersNFTs")}> NFTs ({userNFTsTotal}+) </li>}
                    {userNFTsTotal < 100 && <li onClick={() => console.log("Update To Pull All UsersNFTs")}> NFTs ({userNFTsTotal})</li>}

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
                                            <img src={checkIPFShash(data.metadata.image)} alt='' height={110} width={110} />
                                        </PictureBox>
                                        </>}


                                        {data.selected && <>
                                        <PictureBox color={"blue"}
                                                    onClick={() => updateSelectedNFT(data.tokenID, data.collection, index, data.metadata.image, false)}>
                                            <img src={checkIPFShash(data.metadata.image)} alt='' height={110} width={110} />
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
                                        <img src={checkIPFShash(data.metadata.image)} alt='' height={110} width={110} />
                                    </PictureBox>
                                </>}

                                {data.selected && <>
                                    <PictureBox color={"blue"}
                                                onClick={() => updateSelectedNFT(data.tokenID, data.collection, index, data.metadata.image, false)}>
                                        <img src={checkIPFShash(data.metadata.image)} alt='' height={110} width={110} />
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
                                <p> Loading ... </p>
                                {/* <ProgressBarWrapper>
                                    <ProgressBar bgcolor="#F4A7A7" progress={getLoadingIncerment(totalNFTs) * loadedNFTs} height={20} />
                                    <p> Loading all : {totalNFTs} / {loadedNFTs} </p>
                                </ProgressBarWrapper> */}
                            </SpinnerBox>
                        </>}

                        <StakingMetaBox>

                            <MetaBox>
                                <h3> Estaminted Earnings: </h3>

                                <p>${perDay} / Day</p>
                                <p>${(perDay * 7)} / Week</p>
                                <p>${(perDay * 30)} / Month </p>

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

                                <p>$24.17 / Day</p>
                                <p>$170.12 / Week</p>
                                <p>650.12 / Month </p>

                                <ActionButton onClick={() => submit_stake()} color={"#F4A7A7"}> Unstake </ActionButton>
                            </MetaBox>

                            <MetaBox>
                                <h3> Amount To Claim:</h3>

                                <p> ----------------------- </p>
                                <p> | | | $134,020.42 | | | </p>
                                <p> ----------------------- </p>

                                <ActionButton color={"#F4A7A7"}> Claim </ActionButton>
                            </MetaBox>

                        </StakingMetaBox>
                    </>}
                </PictureContainer>



                {!hasNFTs &&
                    <>
                        {hasWallet && <>
                        <NONFTImagesBox>
                            <h3> This Account does not have any NFTs yet! </h3>
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

                                    <PartnersBox>
                                        <a href="https://www.argent.xyz/">
                                            <img src="/wallets/argentLogo.png" alt="" height={190} width={190} />
                                            <p>Argent</p>
                                        </a>

                                        <a href="https://www.coinbase.com/wallet">
                                            <img src="/wallets/coinbaseLogo.png" alt="" height={190} width={190} />
                                            <p>Coinbase Wallet</p>
                                        </a>

                                        <a href="https://metamask.io/">
                                            <img src="/wallets/metamaskLogo.png" alt="" height={190} width={190} />
                                            <p>Metamask</p>
                                        </a>

                                        <a href="https://rainbow.me/">
                                            <img src="/wallets/rainbowLogo.png" alt="" height={190} width={190} />
                                            <p>Rainbow</p>
                                        </a>
                                    </PartnersBox>

                                </NONFTImagesBox>
                            </>}
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