import { useEffect, useState } from "react";
import styled from "styled-components";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";


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

img {
    margin: 20px;
    border: 1px solid black;
    border-radius: 10px;
}

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


`

//Fix so that if pulls NFTs once the user connects or reconnects to meta-mask.
export function Account({ userAddress, web3 }: any) {

    const [userNFTs, setUserNFTs] = useState([{ name: null, image: null }]);
    const [hasNFTs, setHashNFTs] = useState(true);

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

        if (nfts.ownedNfts.length <= 0) {
            alert("No NFTs found");
            setHashNFTs(false);
            return (0);
        }

        for (let i = 0; i < nfts.ownedNfts.length; i++) {
            console.log(nfts.ownedNfts[i].contract.address);
            console.log(parseInt(nfts.ownedNfts[i].id.tokenId, 16));

            let TokenID = parseInt(nfts.ownedNfts[i].id.tokenId, 16);

            const response = await web3.alchemy.getNftMetadata({
                contractAddress: nfts.ownedNfts[i].contract.address,
                tokenId: TokenID.toString()
            });

            //@ts-ignore
            setUserNFTs(userNFTs => [...userNFTs, response.metadata])
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
                <PictureContainer>
                    {hasNFTs && <>
                        <PictureBox>
                            {userNFTs.map((data) =>
                                <>
                                    {data.name != null && <>
                                        <img src={checkIPFShash(data.image)} alt='' height={120} width={120} />
                                    </>}

                                </>
                            )}
                        </PictureBox>

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