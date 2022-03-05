import { useEffect, useState } from "react";
import styled from "styled-components";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import SampleABI from "./Staking.json"
import StakingABI from "../../config/staking.json";
import NftABI from "../../config/NftStakTest.json";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Image from "next/image";
import ProgressBar from "./progressBar";

const ONE_ETHER = 1000000000000000000;

const StakingContractAddress = "0xd8B36D42FB7B2d6983e9B789BaB2E261BEf96d9f";
const NftContractAddress = "0xeaEd850e4b857f8D403Dfd58758664391239B115";

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

const UserERC20BalanceBox = styled.div`
    text-align: right;
    padding-right: 245px;
    margin-top: -40px;
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
export function Account({ userAddress, web3, provider, networkID }: any) {

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
    
    const [totalTestNftsMinted, setTotalTestNftsMinted] = useState(0);
    const [userNFTsStaked, setUserNFTsStaked] = useState(0);
    const [userERC20Balance, setUserERC20Blanace] = useState(0);

    const [selectedTokenIDs, setSelectedTokenIDs] = useState([0,0]);

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
            console.log("Starting setAprrovalForAll request");
            let ApproveResponse = await nftContract.methods.setApprovalForAll(StakingContractAddress, true).send({from: Ethaccounts[0]})
            console.log("setApproval Request recived");

            let StakeRespone = await StakingContract.methods.stake_nfts([3,4]).send({ from: Ethaccounts [0]});

            console.log(ApproveResponse);
            console.log(StakeRespone);
            return (0);
        }

        if (isApproved) {
            console.log(selectedTokenIDs);

            await StakingContract.methods.stake_nfts(selectedTokenIDs).send({ from: Ethaccounts[0] });
        }
    }

    async function submit_unstake() {
        const Ethaccounts = await web3.eth.getAccounts();

        const StakingContract = new web3.eth.Contract(
            StakingABI.abi,
            StakingContractAddress
        );

        let selectedTokenIDs = [0];

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

        selectedTokenIDs.shift();
        console.log(selectedTokenIDs);

        console.log("Unstaking Started");
        let res = await StakingContract.methods.unstake_nfts(Ethaccounts[0], selectedTokenIDs).send({ from: Ethaccounts[0] });
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
        let res = await StakingContract.methods.claim_coins(Ethaccounts[0]).send({from: Ethaccounts[0]});
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

        setTotalTestNftsMinted(totalAmountMinted);

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

        //Have Loading Window For When Token is Minting;
        let res = await nftContract.methods.mint(Ethaccounts[0], _tokenID, _tokenURI).send({from: Ethaccounts[0]});
        console.log("Minting Ended");

        //Update Page to show NFT is there;
        let updatedNFTamount = testNftAmount + 1;
        setTestNftAmount(updatedNFTamount);

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

        console.log(userNFTs.ownedNfts);
        //@ts-ignore
        setAlchemeyData(userNFTs.ownedNfts);

        if (viewingStakedNFTs) {
            setViewingStakedNFTs(false);
        }

        if (viewingNFTs) {
            setViewingNFTs(false);
        }

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

        setViewingStakedNFTs(true);
        setHasLoaded(true);
 
        console.log("-----------------")
    }

    async function loadUserTestNfts() {

        setHashNFTs(true);
        setHasLoaded(false);
        const Ethaccounts = await web3.eth.getAccounts();

        const nftContract = new web3.eth.Contract(
            NftABI.abi,
            "0xeaEd850e4b857f8D403Dfd58758664391239B115"
        );

        let NftMeta = [{metadata: {image: ""}}];

        console.log("total minted: " + totalTestNftsMinted);
        for (let x = 0; x < totalTestNftsMinted - 1; x++) {

            let Owner = await nftContract.methods.ownerOf(x).call();
            console.log("Owner: " + Owner);

            if (Owner = Ethaccounts[0]) {
                let tokenURI = await nftContract.methods.tokenURI(x).call();

                console.log(tokenURI);
                //ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1

                let _ipfsHash = tokenURI.substring(7, 56);
                let _URL = "https://ipfs.io/ipfs/" + _ipfsHash;
                let _tokenID = x;

                console.log("_ipfsHash: " + _ipfsHash);
                console.log("_URL: " + _URL);

                fetch(_URL)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.image);

                        let ImageHash = data.image.substring(7,56);
                        let _ImageURL = "https://ipfs.io/ipfs/" + ImageHash;

                        let _temp = {
                            metadata: {image: _ImageURL},
                            tokenID: _tokenID,
                            collection: "Mock Azuki Test NFT",
                            selected: false
                        }

                        console.log(_temp);
                        NftMeta.push(_temp);
                    })
            }
        }

        console.log(NftMeta);
        //@ts-ignore
        setAlchemeyData(NftMeta);
        setHasLoaded(true);
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

        if (web3.currentProvider.networkVersion != undefined) {
            if (web3.currentProvider.networkVersion != "4") {
                alert("Please Connect To Rinkeby Testnet")
                return (0);
            }
        }

        if (!userAddress) {
            setHasWallet(false);
            setHashNFTs(false);
            _zeroTotals();
        } else {
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
            <Header />
            <Container>
                <h2> User NFTs </h2>

                <FilterBar>
                <ul>
                    <li onClick={() => selectAllNFTs()}>Select All</li>
                    <li onClick={() => loadUserCollections()}>Collections ({userCollectionTotal}) </li>

                    {viewingNFTs && <li onClick={() =>  getAlchemyDataChubbis()}> <strong> NFTs ({userNFTsTotal}) </strong> </li>}
                    {!viewingNFTs && <li onClick={() => getAlchemyDataChubbis()}> NFTs ({userNFTsTotal})</li>}

                    {viewingTestNFTs && <li   onClick={() => LoadUserNFTs()}> <strong> Test NFTs ({testNftAmount}) </strong> </li>}
                    {!viewingTestNFTs && <li onClick={() => LoadUserNFTs()}> Test NFTs ({testNftAmount}) </li>}

                    {viewingStakedNFTs && <li onClick={() => LoadStakedNFTs([1,2])}> <strong> Staked NFTs ({userNFTsStaked}) </strong> </li>}
                    {!viewingStakedNFTs && <li onClick={() => LoadStakedNFTs([1,2])}> Staked NFTs ({userNFTsStaked})</li>}

                    {testNftAmount < 2 && userNFTsStaked < 2 && <>
                        <li onClick={() => mint_test_nft()}><strong> <u> Get Free NFT </u> </strong></li>
                    </>}
                </ul>
                </FilterBar>

                {userERC20Balance > 0 && <>
                    <UserERC20BalanceBox>
                        <h3> Blanace: {userERC20Balance.toFixed(2)} NSC</h3>
                    </UserERC20BalanceBox>
                </>}

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
                                                    onClick={() => updateSelectedNFT(parseInt(data.id.tokenId, 16).toString(), data.collection, index, data.metadata.image, true)}>
                                            <img src={checkIPFShash(data.metadata.image)} alt='' height={150} width={150} />
                                        </PictureBox>
                                        </>}


                                        {data.selected && <>
                                        <PictureBox color={"blue"}
                                                    onClick={() => updateSelectedNFT(parseInt(data.id.tokenId, 16).toString(), data.collection, index, data.metadata.image, false)}>
                                            <img src={checkIPFShash(data.metadata.image)} alt='' height={150} width={150} />
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
                                                onClick={() => updateSelectedNFT(parseInt(data.id.tokenId, 16).toString(), data.collection, index, data.metadata.image, true)}>
                                        <img src={checkIPFShash(data.metadata.image)} alt='' height={180} width={180} />
                                    </PictureBox>
                                </>}

                                {data.selected && <>
                                    <PictureBox color={"blue"}
                                                onClick={() => updateSelectedNFT(parseInt(data.id.tokenId, 16).toString(), data.collection, index, data.metadata.image, false)}>
                                        <img src={checkIPFShash(data.metadata.image)} alt='' height={180} width={180} />
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
                                </>}

                                {!viewingStakedNFTs && <>
                                <ul>
                                    <li>+{perDay} NSC / Day</li>
                                    <li>+{(perDay * 7)} NSC / Week</li>
                                    <li>+{(perDay * 30)} NSC / Month </li>
                                </ul>
                                </>}

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
                                    <li>{(100 * userNFTsStaked).toFixed(2)} NSC / Day</li>
                                    <li>{(100 * userNFTsStaked * 7).toFixed(2)} NSC / Week</li>
                                    <li>{(100 * userNFTsStaked * 30).toFixed(2)} NSC / Month </li>
                                </ul>

                                <ActionButton onClick={() => submit_unstake()} color={"#F4A7A7"}> Unstake </ActionButton>
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

export default Account;


//To-Do Tommorow

//setApprovalForAll Screen
//loadingScreen while waiting to stake
//loadingScreen while waiting to unstake
//loadingScreen while waiting to claim coins
//page should be updated once loadingScreen is done

//Display Blanace of staking tokens
//Fix Estaminted Earnings to Coins per Time periods
//Fix Current Earnings to Coins per Time periods
//Fix Amount to Claim when user unstakes all their NFTs