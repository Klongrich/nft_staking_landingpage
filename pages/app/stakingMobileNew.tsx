import { useEffect, useState } from "react";
import styled from "styled-components";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import SampleABI from "./Staking.json"
import StakingABI from "../../config/staking.json";
import NftABI from "../../config/NftABI.json";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Image from "next/image";
import ProgressBar from "./progressBar";

const ONE_ETHER = 1000000000000000000;

const StakingContractAddress = "0x82dBF3a8Abf8A63E2f5A7b62d3D643f03e31999d";
const NftContractAddress = "0x702FbFa4ed5861C73d2a1EFA9007FBc8C13a5EAc";

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

        margin-left: 30px;

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
    margin-top: -30px;
    margin-bottom: 175px;

    ul {
        list-style-type: none;
        margin-left: -20px;
    }

    li {
        float: left;
        padding-left: 8px;
        padding-right: 8px;

        font-size: 16px;

        padding-top: 13px;
        padding-bottom: 13px;

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
    width: 800px;
    display: inline-block;
    padding-right: 100px;

    p {
        margin-top: -50px;
        margin-left: 82px;
    }
`

const UserERC20BalanceBox = styled.div`
    margin-left: 26px;
    margin-top: -25px;
    margin-bottom: 40px;
`

const DialogBackground = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    opacity: 0.3;
    pointer-events: none;

    background-color: black;

    height: 1500px;
    width: 2500px;
`

const MintingNFTBox = styled.div`
    position: fixed;
    z-index: 2;
    color: black;
    background-color: #CD8285;
    text-align: center;

    top: 50px;
    left: 14px;

    height: 672px;
    width: 380px;
    padding-top: 10px;

    border: 2px solid black;
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: inline-block;

    h2 {
        font-size: 32px;
    }

    ul {
        list-style-type: none;
        text-align: center;
        font-weight: bold;
        margin-left: -48px;
    }

    li {
        padding-top: 10px;
        padding-bottom: 10px;

        font-size: 22px;
    }
`

const MintedNFTBox= styled.div`
    position: fixed;
    z-index: 2;
    color: black;
    background-color: #CD8285;
    text-align: center;

    top: 110px;
    left: 19px;

    height: 550px;
    width: 375px;
    padding-top: 10px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: inline-block;

    h2 {
        font-size: 32px;
    }

    h3 {
        font-size: 26px;
    }

    img {
        border: 1px solid black;
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.55);
    }

    ul {
        list-style-type: none;
        text-align: right;
        font-weight: bold;

        width: 180px;
    }

    ol {
        list-style-type: none;
        text-align: left;

        margin-top: -115px;
        margin-left: 200px;
    }

    li {
        padding-top: 5px;
        padding-bottom: 5px;

        font-size: 20px;
    }

    h4 {
        padding-top: 45px;
        :hover {
            cursor: pointer;x
        }
    }
`

const SetApprovalHeader = styled.div`
    background-color: #F4A7A7;
    z-index: 3;
    position: fixed;

    top: 190px;
    left: 634px;

    height: 30px;
    width: 500px;
`

const SetApprovalBox = styled.div`
    position: fixed;
    z-index: 3;
    color: black;
    background-color: #CD8285;
    text-align: center;

    top: 220px;
    left: 634px;

    height: 500px;
    width: 500px;

    h2 {
        padding-top: 55px;
        padding-bottom: 0px;
        font-size: 30px;
    }

    p {
        padding-top: 70px;
        padding-bottom: 70px;

        font-size: 26px;
    }
`

const SubmitStakeLoadingBox = styled.div`
position: fixed;
z-index: 3;
color: black;
background-color: #CDA3A6;
text-align: center;

top: 67px;
left: 30px;

height: 620px;
width: 350px;

`

const SubmitStakeInnerLoadingBox = styled.div`
color: black;
background-color: #CD8285;
text-align: center;

padding-top: 20px;
margin-top: 40px;
margin-left: 25px;
margin-right: 10px;

height: 350px;
width: 300px;

border: 1px solid black;
border-radius: 20px;

h3 {
    padding-bottom: 38px;
}

`

var SelectedNFTs = [{ Collection : "holder", tokenID : "0" }];
var UserNFTs = [{ image: "", tokenID: "", collection: "", selected: false}];

var testNFTs = [{image: "", attributes: [{}]}]

//v3
//const StakingContractAddress = "0x929cc39e988a9FA580f06985f0F945FD16f95980";
//v2
//const StakingContractAddress = "0x41F3c81b57aCA30f1c4b8D74d5CD2862d189f5Cd";
//v1
//const StakingContractAddress = "0x2256D435F1b895D650F308D497A6701268e7D100"

//Fix so that if pulls NFTs once the user connects or reconnects to meta-mask.
export function StakingMobile({ userAddress, web3, provider, networkID }: any) {

    const [hasNFTs, setHashNFTs] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [userNFTs, setUserNFTs] = useState(UserNFTs);
    const [selectedNFTs, setSelectedNFTs] = useState(SelectedNFTs);

    const [perDay, setPerDay] = useState(0);
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

    const [AlchemeyData, setAlchemeyData] = useState([{metadata: {image : ""}, id: {tokenId: ""} , collection: "", selected: false }]);
    const [hasWallet, setHasWallet] = useState(false);

    const [payOutAmount, setPayOutAmount] = useState(0);

    const [testNftAmount, setTestNftAmount] = useState(0);
    const [TestNfts, setTestNfts] = useState(testNFTs);
    const [hasTestNfts, setHasTestNfts] = useState(false);

    const [viewingStakedNFTs, setViewingStakedNFTs] = useState(false);
    const [viewingTestNFTs, setViewingTestNFTs] = useState(false);
    const [viewingNFTs, setViewingNFTs] = useState(true);

    const [isMinting, setIsMinting] = useState(false);
    const [finishedMint, setFinishedMint] = useState(true);
    const [isApproving, setIsAprroving] = useState(false);
    const [approveLoading, setApprovedLoading] = useState(false);

    const [isStaking, setIsStaking] = useState(false);
    const [isUnstaking, setIsUnstaking] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);

    const [finishedAprroving, setFinishedApproving] = useState(false);
    const [mintTokenID, setMintTokenID] = useState(0);
    const [mintTokenURI, setMintTokenURI] = useState("");
    const [mintContractAddress, setMintContractAddress] = useState("");
    const [stakingContractApproved, setStakingContractApproved] = useState(false);

    const [totalTestNftsMinted, setTotalTestNftsMinted] = useState(0);
    const [userNFTsStaked, setUserNFTsStaked] = useState(0);
    const [userERC20Balance, setUserERC20Blanace] = useState(0);

    const [selectedTokenIDs, setSelectedTokenIDs] = useState([0,0]);

    const [chubbisLoading, setChubbisLoading] = useState(false);
    const [totalChubbis, setTotalChubbis] = useState(0);
    const [loadedChubbis, setLoadedChubbis] = useState(0);

    const [etherScanStakeURL, setEtherScanStakeURL] = useState("");
    const [etherScanUnstakeURL, setEtherScanUnstakeURL] = useState("");
    const [etherScanClaimURL, setEtherScanCliamURL] = useState("");
    const [etherScanMintURL, setEtherScanMintURL] = useState("");

    const [mintTransactinHash, setMintTransactionHash] = useState("");
    const [stakeTransactionHash, setStakeTransactionHash] = useState("");
    const [unstakeTransactionHash, setUnstakeTransactionHash] = useState("");
    const [claimTransactionHash, setClaimTransactinHash] = useState("");

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
            setPerDay(perDay + 100);
        } else {
            setPerDay(perDay - 100);
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

       console.log("TokenID: " + tokenID);
        updatedArray[index] = {
            metadata : {image : image},
            id: {tokenId: tokenID},
            collection: "Azuki Test NFT",
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

    async function setApprovalForAll() {
        const Ethaccounts = await web3.eth.getAccounts();

        const nftContract = new web3.eth.Contract(
            NftABI.abi,
            NftContractAddress
        );

        let isApproved;

        isApproved = await nftContract.methods.isApprovedForAll(Ethaccounts[0], StakingContractAddress).call();

        if (!isApproved) {
            console.log("Starting setAprrovalForAll request");
            setApprovedLoading(true);
            let ApproveResponse = await nftContract.methods.setApprovalForAll(StakingContractAddress, true).send({from: Ethaccounts[0]})
            setFinishedApproving(true);
            setStakingContractApproved(true);
            console.log("setApproval Request recived");
            console.log(ApproveResponse);
            return (0);
        }
    }

    async function submit_stake() {
        const Ethaccounts = await web3.eth.getAccounts();

        const StakingContract = new web3.eth.Contract(
            StakingABI.abi,
            StakingContractAddress
        );

        const nftContract = new web3.eth.Contract(
            NftABI.abi,
            NftContractAddress
        );

        let selectedTokenIDs = [];

        //Bug When selecting NFTs to stake
        for (let x = 0; x < AlchemeyData.length; x++) {
            console.log(AlchemeyData[x].selected);

            if (AlchemeyData[x].selected != undefined ) {
                if(AlchemeyData[x].selected != false) {
                    let tokenID = parseInt(AlchemeyData[x].id.tokenId, 16);
                    selectedTokenIDs[x] = tokenID;

                    console.log(tokenID);
                }
            }
        }

        let isApproved;

        isApproved = await nftContract.methods.isApprovedForAll(Ethaccounts[0], StakingContractAddress).call();

        if (!isApproved) {
            alert("Staking Contract is not Approved By User")
            return (0);
        }

        if (isApproved) {
            console.log(selectedTokenIDs);

            let _selectedTokenIDs = selectedTokenIDs.filter((a) => a);

            console.log(_selectedTokenIDs.length);
            console.log("Starting To Stake NFTs");

            setIsStaking(true);

            let _baseURL = "https://rinkeby.etherscan.io/tx/";

            await StakingContract.methods.stake_nfts(_selectedTokenIDs).send({ from: Ethaccounts[0] })
                .on('transactionHash', function(hash : any) {
                    console.log("transaction hash: " + hash);
                    setStakeTransactionHash(hash);
                    setEtherScanStakeURL(_baseURL + hash);
                });

            setStakeSelected(false);

            await LoadUserNFTs();
            await getUserStakingMeta();

            setIsStaking(false);

            console.log("User NFTs are now Staked;")
        }
    }

    async function submit_unstake() {
        const Ethaccounts = await web3.eth.getAccounts();

        const StakingContract = new web3.eth.Contract(
            StakingABI.abi,
            StakingContractAddress
        );

        let selectedTokenIDs = [];

        //Bug When selecting NFTs to stake
        for (let x = 0; x < AlchemeyData.length; x++) {
            console.log(AlchemeyData[x].selected);

            if (AlchemeyData[x].selected != undefined ) {
                if(AlchemeyData[x].selected != false) {
                    let tokenID = parseInt(AlchemeyData[x].id.tokenId, 10);
                    selectedTokenIDs[x] = tokenID;

                    console.log("Selected: ID" + tokenID);
                }
            }
        }

        selectedTokenIDs.shift();
        console.log(selectedTokenIDs);

        let _selectedTokenIDs = selectedTokenIDs.filter((a) => a);

        console.log(_selectedTokenIDs);

        console.log("Unstaking Started");
        setIsUnstaking(true);

        console.log(_selectedTokenIDs);

        let _baseURL = "https://rinkeby.etherscan.io/tx/";

        let res = await StakingContract.methods.unstake_nfts(Ethaccounts[0], _selectedTokenIDs).send({ from: Ethaccounts[0] })
            .on('transactionHash', function(hash : any) {
                console.log("transaction hash: " + hash);
                setUnstakeTransactionHash(hash);
                setEtherScanUnstakeURL(_baseURL + hash);
            })
            .on('error', function(error: any) {
                console.log(error);
            });

        setStakeSelected(false);

        await LoadStakedNFTs([2,3]);
        await getUserStakingMeta();

        setIsUnstaking(false);

        console.log("Unstaking Completed");
        console.log(res);
    }

    async function claim_coins() {
        const Ethaccounts = await web3.eth.getAccounts();

        const StakingContract = new web3.eth.Contract(
            StakingABI.abi,
            StakingContractAddress
        );

        console.log("Claim Coins Started");
        setIsClaiming(true);

        let _baseURL = "https://rinkeby.etherscan.io/tx/";

        let res = await StakingContract.methods.claim_coins(Ethaccounts[0]).send({from: Ethaccounts[0]})
            .on('transactionHash', function(hash : any) {
                console.log("transaction hash: " + hash);
                setClaimTransactinHash(hash);
                setEtherScanCliamURL(_baseURL + hash);
            });

        setPayOutAmount(0);
        getUserERC20blanace();

        setIsClaiming(false);
        console.log("CLaim Coins Ended");
        console.log(res);
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

    async function getAlchemyDataChubbis() {
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
                            console.log("all Owned NFTs: \n\n" + allUserNFTs.ownedNfts.length + "\n\n");
                            setUserNFTsTotal(allUserNFTs.ownedNfts.length);
                            //@ts-ignore
                            setAlchemeyData(allUserNFTs.ownedNfts);

                            if (viewingTestNFTs) {
                                setViewingTestNFTs(false);
                            }

                            if(viewingStakedNFTs) {
                                setViewingStakedNFTs(false);
                            }

                            setViewingNFTs(true);

                            setHasLoaded(true);
                            setHashNFTs(true);
                            return (0);
                        } else {

                            if (viewingTestNFTs) {
                                setViewingTestNFTs(false);
                            }

                            if(viewingStakedNFTs) {
                                setViewingStakedNFTs(false);
                            }

                            setViewingNFTs(true);

                            setHashNFTs(false);
                            _zeroTotals();
                            return (0);
                        }
                    }
                    //@ts-ignore
                    setAlchemeyData(userNFTs.ownedNfts);
                    setUserChubbisTotal(userNFTs.ownedNfts.length);
                    console.log(userNFTs.ownedNfts);
                    if (viewingTestNFTs) {
                        setViewingTestNFTs(false);
                    }

                    if(viewingStakedNFTs) {
                        setViewingStakedNFTs(false);
                    }

                    setViewingNFTs(true);

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

    async function getUserStakingMeta() {

        const Ethaccounts = await web3.eth.getAccounts();

        const nftContract = new web3.eth.Contract(
            NftABI.abi,
            NftContractAddress
        );

        let amountMinted = await nftContract.methods.mintAmount(Ethaccounts[0]).call();
        let totalAmountMinted = await nftContract.methods.mintCount().call();
        let isApproved = await nftContract.methods.isApprovedForAll(Ethaccounts[0], StakingContractAddress).call();

        setTotalTestNftsMinted(totalAmountMinted);
        setStakingContractApproved(isApproved);

        if (amountMinted >= 2) {
            console.log("Max Amount Minted");
        }

        const StakingContract = new web3.eth.Contract(
            StakingABI.abi,
            StakingContractAddress
        );

        let AmountStaked = await StakingContract.methods.getCurrentAmountStaked(Ethaccounts[0]).call();
        setUserNFTsStaked(AmountStaked);
        setTestNftAmount(amountMinted - AmountStaked);

        if (AmountStaked > 0) {

        console.log("Amount Staked: " + AmountStaked);

        let totalPayout = 0;

        for (let i = 0; i < AmountStaked; i++) {
            let timeDeposited = await StakingContract.methods.getDepositTimeByIndex(Ethaccounts[0], i).call();

            let _payOut = await StakingContract.methods._calculatePayOut(i, timeDeposited).call();

            totalPayout += parseFloat(_payOut);

            console.log("Time Deposited: " + timeDeposited);
        }

        let stakedTokenIDs = [];

        for (let x = 0; x < AmountStaked; x++) {
            let _tokenID = await StakingContract.methods.getTokenID(Ethaccounts[0], x).call();
            stakedTokenIDs[x] = _tokenID;
            console.log("token id: " + _tokenID);
        }

        //LoadStakedNFTs(stakedTokenIDs);

        console.log("Payout: " + totalPayout / ONE_ETHER);
        setPayOutAmount(totalPayout / ONE_ETHER);
    }

    }

    async function mint_test_nft() {
        console.log(userAddress);

        console.log(await web3.eth.getAccounts());
        const Ethaccounts = await web3.eth.getAccounts();

        const nftContract = new web3.eth.Contract(
            NftABI.abi,
            NftContractAddress
        );

        let amountMinted = await nftContract.methods.mintCount().call();

        console.log("Amount Minted: " + amountMinted);

        let _tokenID = parseInt(amountMinted) + 1;

        let _tokenURI = "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/" + (_tokenID);

        console.log("Minting Started");

        console.log("Address: " + Ethaccounts[0]);
        console.log("TokenID: " + _tokenID);
        console.log("TokenURI: " + _tokenURI);

        setMintContractAddress(NftContractAddress);
        setMintTokenID(_tokenID);
        setMintTokenURI(_tokenURI);

        setIsMinting(true);
        setFinishedMint(false);
        //Have Loading Window For When Token is Minting;

        let _baseURL = "https://rinkeby.etherscan.io/tx/";

        let res = await nftContract.methods.Mint(Ethaccounts[0], _tokenID, _tokenURI).send({from: Ethaccounts[0]})
            .on('transactionHash', function(hash : any) {
                console.log("transaction hash: " + hash);
                setMintTransactionHash(hash);
                setEtherScanMintURL(_baseURL + hash);
            });

        setFinishedMint(true);
        console.log("Minting Ended");

        //Update Page to show NFT is there;
        let updatedNFTamount = testNftAmount + 1;
        setTestNftAmount(updatedNFTamount);
        await LoadUserNFTs();

        console.log(res);

    }

    async function LoadUserNFTs() {
        setHashNFTs(true);
        setHasLoaded(false);
        const Ethaccounts = await web3.eth.getAccounts();

        const web3Alchemy = createAlchemyWeb3(
            "https://eth-rinkeby.alchemyapi.io/v2/tY83BF3NHyUJl_TYPgWVfMspw4Ia7mA9",
        );

        console.log(Ethaccounts);
        const userNFTs = await web3Alchemy.alchemy.getNfts({ owner: Ethaccounts[0], contractAddresses: [NftContractAddress] });


        for (let i = 0; i < userNFTs.ownedNfts.length; i++) {
            //@ts-ignore
            if (!userNFTs.ownedNfts[i].metadata.image) {
                console.log("metadata image URL NOT FOUND");
            }
        }


        console.log(userNFTs.ownedNfts);
        //@ts-ignore
        setAlchemeyData(userNFTs.ownedNfts);

        if (viewingStakedNFTs) {
            setViewingStakedNFTs(false);
        }

        if (viewingNFTs) {
            setViewingNFTs(false);
        }

        setPerDay(0);
        setStakeSelected(false);

        await getUserStakingMeta();

        setViewingTestNFTs(true);
        setHasLoaded(true);
    }

    async function LoadStakedNFTs(userTokenIDs : any) {
        setHashNFTs(true);
        setHasLoaded(false);
        const Ethaccounts = await web3.eth.getAccounts();

        const StakingContract = new web3.eth.Contract(
            StakingABI.abi,
            StakingContractAddress
        );

        //Get Amount of NFTs user has Staked
        let AmountStaked = await StakingContract.methods.getCurrentAmountStaked(Ethaccounts[0]).call();

        const web3Alchemy = createAlchemyWeb3(
            "https://eth-rinkeby.alchemyapi.io/v2/tY83BF3NHyUJl_TYPgWVfMspw4Ia7mA9",
        );

        let tempAlchemyData = [{metadata: {image: ""} ,id: {tokenId: ""} , collection: "", selected: false }];

        for (let x = 0; x < AmountStaked; x++) {
            let _tokenID = await StakingContract.methods.getTokenID(Ethaccounts[0], x).call();

            console.log("token id: " + _tokenID);

            console.log("fetching metadata for a crypto coven NFT...");

            const response = await web3Alchemy.alchemy.getNftMetadata({
                contractAddress: NftContractAddress,
                tokenId: _tokenID
            })

            let temp = {
                metadata : {image: response.metadata.image},
                id: {tokenId: _tokenID},
                collection: response.contract.address,
                selected: false
            }

            tempAlchemyData.push(temp);

            console.log(response);
        }

        console.log(tempAlchemyData);
        setAlchemeyData(tempAlchemyData);

        if (viewingTestNFTs) {
            setViewingTestNFTs(false);
        }

        if (viewingNFTs) {
            setViewingNFTs(false);
        }

        setPerDay(0);
        setStakeSelected(false);

        await getUserStakingMeta();

        setViewingStakedNFTs(true);
        setHasLoaded(true);
 
        console.log("-----------------")
    }


    async function getUserERC20blanace() {
        const Ethaccounts = await web3.eth.getAccounts();

        const ERC20Contract = await new web3.eth.Contract(
            StakingABI.abi,
            StakingContractAddress
        );

        let userBalance = await ERC20Contract.methods.balanceOf(Ethaccounts[0]).call();

        console.log("userBalance: " + userBalance / ONE_ETHER);

        setUserERC20Blanace(userBalance / ONE_ETHER);
    }

    //@ts-ignore
    useEffect(() => {
        //getUserNFTs();
        //getAlchemyData();
        //getUserStakingMeta();
        if (!userAddress) {
            setHasWallet(false);
            setHashNFTs(false);
            _zeroTotals();
        } else {

            if (web3.currentProvider.networkVersion != undefined) {
                if (web3.currentProvider.networkVersion === "1") {
                    alert("We have Detected Your on mainnet please switch to rinkeby for testing developement");
                };
                if (web3.currentProvider.networkVersion != "4") {
                    alert("Please Connect To Rinkeby Testnet")
                    return (0);
                }
            }

            getAlchemyDataChubbis();
            getUserStakingMeta();
            getUserERC20blanace();
            //getAlchemyData();
            setHasWallet(true);
            provider.on("accountsChanged", (accounts: string[]) => {
                if (!accounts[0]) {
                    setHasWallet(false);
                    setHashNFTs(false);
                } else {
                    setHasLoaded(false);
                    getAlchemyDataChubbis();
                    getUserStakingMeta();
                    getUserERC20blanace();
                    //getAlchemyData();
                    setHasWallet(true);
                }
        });
    }
    }, [])

    return (
        <>
            {isApproving && <>
                <DialogBackground />
                {!finishedAprroving && <>
                    <SetApprovalHeader />
                    <SetApprovalBox>
                        <h2> Please Approve Staking Contract</h2>
                        {!approveLoading && <>
                            <p> Status: Unapproved </p>
                            <ActionButton color="#F4A7A7" onClick={() => setApprovalForAll()}> Approve </ActionButton>
                        </>}
                        {approveLoading && <>
                            <Image src={"/ColoredSpinner3.gif"} alt='' height={170} width={170} />
                            <p>  Status: ....... Loading ... please wait </p>
                            <ActionButton color="#F4A7A7"> .............. </ActionButton>
                        </>}
                    </SetApprovalBox>
                </>}

                {finishedAprroving && <>
                    <SetApprovalBox>
                        <h2> Staking Contract Approved!</h2>
                        <p> Status: Approved! </p>

                        <ActionButton color="#F4A7A7" onClick={() => setIsAprroving(false)}> Stake NFTs </ActionButton>
                    </SetApprovalBox>
                </>}

            </>}

            {isMinting && <>
                <DialogBackground />
                    {!finishedMint && <>
                        <MintingNFTBox>
                            <h2> Minting Free NFT ..... </h2>

                            <ul>
                                <li>TokenID: </li>
                                <li> <strong> {mintTokenID} </strong> </li>
                                <li>TokenURI: </li>
                                <li> <a href={mintTokenURI}> <strong> Link</strong> </a> </li>
                                <li>Contract Address: </li>
                                <li> <strong> {mintContractAddress.substring(0,5) + '....' + mintContractAddress.substring(37,42)} </strong> </li>
                                <li>Transaction Hash:</li>
                                <li> <a href={etherScanMintURL} rel="noreferrer" target="_blank" > <strong> {mintTransactinHash.substring(0,5) + "...." + mintTransactinHash.substring(37, 42)} </strong> </a></li>
                            </ul>

                            <br />
                                <Image src={"/ColoredSpinner3.gif"} alt='' height={90} width={90} />
                            <br />

                            <h3> <a href={etherScanMintURL} rel="noreferrer" target="_blank">View On Etherscan </a> </h3>

                        </MintingNFTBox>
                    </>}

                    {finishedMint && <>
                        <MintedNFTBox>
                            <h2> Free NFT Minted!</h2>

                            <h3> Azuki #{mintTokenID} </h3>

                            <img src={"https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/" + mintTokenID + ".png"} alt="" height={220} width={220} />

                            <h3> <a href={"https://testnets.opensea.io/assets/0xeaed850e4b857f8d403dfd58758664391239b115/" + mintTokenID} target="_blank" rel="noreferrer" > View on Opensea</a> </h3>
                            <h4 onClick={() => setIsMinting(false)}> Close </h4>
                        </MintedNFTBox>
                    </>}
            </>}

            {isStaking && <>
                <DialogBackground />
                <SubmitStakeLoadingBox>
                    <SubmitStakeInnerLoadingBox>
                        <h2>Stake Submitted To Ethereum Block-chain</h2>
                        <h3> Stake Loading .... Please Wait .... </h3>
                        <Image src={"/ColoredSpinner3.gif"} alt='' height={90} width={90} />
                    </SubmitStakeInnerLoadingBox>
                    <h4>Transaction Hash:</h4>
                    <p> <a href={etherScanStakeURL} target="_blank" rel="noreferrer" > {stakeTransactionHash.substring(0,5) + "...." + stakeTransactionHash.substring(50, 55)} </a></p>
                </SubmitStakeLoadingBox>
            </>}

            {isUnstaking && <>
                <DialogBackground />
                <SubmitStakeLoadingBox>
                    <SubmitStakeInnerLoadingBox>
                        <h2>Unstake Submitted To Ethereum Block-chain</h2>
                        <h3> Unstake Loading .... Please Wait .... </h3>
                        <Image src={"/ColoredSpinner3.gif"} alt='' height={90} width={90} />
                    </SubmitStakeInnerLoadingBox>
                    <h4>Transaction Hash: </h4>
                    <p><a href={etherScanUnstakeURL} target="_blank" rel="noreferrer" > {unstakeTransactionHash.substring(0,5) + "...." + stakeTransactionHash.substring(50, 55)} </a></p>
                </SubmitStakeLoadingBox>
            </>}

            {isClaiming && <>
                <DialogBackground />
                <SubmitStakeLoadingBox>
                    <SubmitStakeInnerLoadingBox>
                        <h2> Claim Submitted To Ethereum Block-chain</h2>
                        <h3> Claim Loading .... Please Wait .... </h3>
                        <Image src={"/ColoredSpinner3.gif"} alt='' height={90} width={90} />
                    </SubmitStakeInnerLoadingBox>
                    <h4>Transaction Hash: </h4>
                    <p> <a href={etherScanClaimURL} target="_blank" rel="noreferrer" > {claimTransactionHash.substring(0,5) + "...." + claimTransactionHash.substring(50,55)} </a> </p>
                </SubmitStakeLoadingBox>
            </>}


            <Header />
            <Container>
                <h2> User NFTs </h2>

                {userERC20Balance > 0 && <>
                    <UserERC20BalanceBox>
                        <h3> Blanace: {userERC20Balance.toFixed(2)} NSC</h3>
                    </UserERC20BalanceBox>
                </>}

                <FilterBar>
                <ul>
                    <li onClick={() => selectAllNFTs()}>Select All</li>
                    <li onClick={() => loadUserCollections()}>Collections ({userCollectionTotal}) </li>

                    {viewingNFTs && <li onClick={() =>  getAlchemyDataChubbis()}> <strong> NFTs ({userNFTsTotal}) </strong> </li>}
                    {!viewingNFTs && <li onClick={() => getAlchemyDataChubbis()}> NFTs ({userNFTsTotal})</li>}

                    {viewingTestNFTs && <li   onClick={() => LoadUserNFTs()}> <strong> Free NFTs ({testNftAmount}) </strong> </li>}
                    {!viewingTestNFTs && <li onClick={() => LoadUserNFTs()}> Free NFTs ({testNftAmount}) </li>}

                    {viewingStakedNFTs && <li onClick={() => LoadStakedNFTs([1,2])}> <strong> Staked NFTs ({userNFTsStaked}) </strong> </li>}
                    {!viewingStakedNFTs && <li onClick={() => LoadStakedNFTs([1,2])}> Staked NFTs ({userNFTsStaked})</li>}

                    {testNftAmount < 3 && userNFTsStaked < 3 && <>
                        <li onClick={() => mint_test_nft()}><strong> <u> Get Free NFT </u> </strong></li>
                    </>}
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
                                                    onClick={() => updateSelectedNFT(data.id.tokenId, data.collection, index, data.metadata.image, true)}>
                                            <img src={checkIPFShash(data.metadata.image)} alt='' height={110} width={110} />
                                        </PictureBox>
                                        </>}


                                        {data.selected && <>
                                        <PictureBox color={"blue"}
                                                    onClick={() => updateSelectedNFT(data.id.tokenId, data.collection, index, data.metadata.image, false)}>
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
                                                onClick={() => updateSelectedNFT(data.id.tokenId, data.collection, index, data.metadata.image, true)}>
                                        <img src={checkIPFShash(data.metadata.image)} alt='' height={110} width={110} />
                                    </PictureBox>
                                </>}

                                {data.selected && <>
                                    <PictureBox color={"blue"}
                                                onClick={() => updateSelectedNFT(data.id.tokenId, data.collection, index, data.metadata.image, false)}>
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

                                {viewingStakedNFTs && <>
                                    <ul>
                                        <li>-{perDay} NSC / Day</li>
                                        <li>-{(perDay * 7)} NSC / Week</li>
                                        <li>-{(perDay * 30)} NSC / Month </li>
                                    </ul>

                                    {stakingContractApproved && <>
                                        <ActionButton color={"#F4A7A7"}> Stake </ActionButton>
                                    </>}

                                    {!stakingContractApproved && <>
                                        <ActionButton onClick={() => setIsAprroving(true)} color={"#F4A7A7"}> Approve</ActionButton>
                                    </>}
                                </>}


                                {!viewingStakedNFTs && <>
                                    <ul>
                                        <li>+{perDay} NSC / Day</li>
                                        <li>+{(perDay * 7)} NSC / Week</li>
                                        <li>+{(perDay * 30)} NSC / Month </li>
                                    </ul>

                                    {!stakingContractApproved && <>
                                        {!stakeSelected && <>
                                            <ActionButton onClick={() => setIsAprroving(true)} color={"#F4A7A7"}> Approve </ActionButton>
                                        </>}

                                        {stakeSelected && <>
                                            <SelectedActionButton onClick={() => setIsAprroving(true)}
                                                color={"#FDC8C7 "}> Approve </SelectedActionButton>
                                        </>}
                                    </>}

                                    {stakingContractApproved && <>
                                        {!stakeSelected && <>
                                            <ActionButton color={"#F4A7A7"}> Stake </ActionButton>
                                        </>}

                                        {stakeSelected && <>
                                            <SelectedActionButton onClick={() => submit_stake()}
                                                color={"#FDC8C7 "}> Stake </SelectedActionButton>
                                        </>}
                                    </>}
                                </>}
                            </MetaBox>

                            <MetaBox>
                                <h3> Current Earnings: </h3>

                                <ul>
                                    <li>{(100 * userNFTsStaked).toFixed(2)} NSC / Day</li>
                                    <li>{(100 * userNFTsStaked * 7).toFixed(2)} NSC / Week</li>
                                    <li>{(100 * userNFTsStaked * 30).toFixed(2)} NSC / Month </li>
                                </ul>

                                {viewingStakedNFTs && <>
                                    {!stakeSelected && <>
                                        <ActionButton color={"#F4A7A7"}> Unstake </ActionButton>
                                    </>}

                                    {stakeSelected && <>
                                        <SelectedActionButton onClick={() => submit_unstake()}
                                            color={"#FDC8C7 "}> Unstake </SelectedActionButton>
                                    </>}
                                </>}

                                {!viewingStakedNFTs && <>
                                    <ActionButton color={"#F4A7A7"}> Unstake </ActionButton>
                                </>}

                            </MetaBox>

                            <MetaBox>
                                <h3> Amount To Claim:</h3>

                                <ul>
                                    <li> ----------------------- </li>
                                    <li> | | | {payOutAmount} NSC | | | </li>
                                    <li> ----------------------- </li>
                                </ul>

                                <ActionButton onClick={() => claim_coins()} color={"#F4A7A7"}> Claim </ActionButton>
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

                        <StakingMetaBoxNONFTS>

                            <MetaBox>
                                <br /> < br />
                                <h3> Estaminted Earnings: </h3>

                                <ul>
                                    <li>N / A</li>
                                </ul>

                                {!stakeSelected && <>
                                    <ActionButton onClick={() => submit_stake()} color={"#F4A7A7"}> Stake </ActionButton>
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

                                <ActionButton onClick={() => submit_unstake()} color={"#F4A7A7"}> Unstake </ActionButton>
                            </MetaBox>

                            <MetaBox>
                                    <br /> <br />
                                <h3> Amount To Claim:</h3>

                                <ul>
                                    <li> {payOutAmount} Coins </li>
                                </ul>

                                <ActionButton onClick={() => claim_coins()} color={"#F4A7A7"}> Claim </ActionButton>
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

export default StakingMobile;

//To-Do Tommorow

//Fix Amount to Claim when user unstakes all their NFTs
//Detect if Mint is still loading for AlchemyAPI call

//Today after lunch / dinner break (Feedback).

//Update page state once user connects wallet to applaction
//Update page state once user switchs to Rinkeby Testnet from other network
//Update on noUserNFTs, make more clear how to get a FREE test NFT in the main box
//Update on Approve Box, fix spacing issue and change header once transaction hash is submitted (switch Approve Contract button to middle of screen)

//Update if wallet has insuffeint funds
