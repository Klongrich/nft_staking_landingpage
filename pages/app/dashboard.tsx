
import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

    margin: 0px;

    padding-bottom: 60px;
    padding-top: 20px;

    h2 {
        padding-left: 50px;
        font-size: 45px;
        text-decoration: underline;
    }

    h4 {
        padding-left: 110px;
        font-size: 22px;

        margin-bottom: 20px;
    }
`

const CollectionsBox = styled.div`
    background-color: #CD8285;
    border: 2px solid black;
    border-radius: 10px;

    padding-left: 20px;
    padding-right: 20px;
    
    padding-top: 40px;
    padding-bottom: 40px;

    margin-left: 80px;
    margin-right: 80px;

    img {
        border: 2px solid black;
        border-radius: 15px;

        margin-left: 40px;
        margin-right: 40px;

        margin-bottom: 40px;

        :hover {
            box-shadow: 0 0 10px black;
            cursor: pointer;
            transition-timing-function: ease-in;
            transition: 0.2s;
            transform: scale(1.03);
        }
    }
`


const Footer = styled.div`
    background-color: black;

    width: 100%;

    padding-top: 20px;
    padding-bottom: 20px;

    text-align: center;
    color: white;

    p {
        :hover {
            color: #0000EE;
            cursor: pointer;
        }
    }

`

const CollectionData = [
    {
        name: "Azuki",
        image_path: "/collections/azuki.jpg"
    },
    {
        name: "Doodles",
        image_path: "/collections/Doodles.png"
    },
    {
        name: "BAYC",
        image_path: "/collections/BAYC.png"
    },
    {
        name: "Cool Cats",
        image_path: "/collections/coolcats.jpg"
    },
    {
        name: "NFT Worlds",
        image_path: "/collections/nftworlds.jpg"
    },
    {
        name: "Mfers",
        image_path: "/collections/mfers.jpg"
    },
    {
        name: "Lazy Lions",
        image_path: "/collections/LazyLions.png"
    },
    {
        name: "Pudgy Penguins",
        image_path: "/collections/pudgypenguins.png"
    },
    {
        name: "Sappy Seals",
        image_path: "/collections/sappyseals.jpg"
    },
    {
        name: "World Of Women",
        image_path: "/collections/WorldOfWomen.jpg"
    },
    {
        name: "Crypto Chicks",
        image_path: "/collections/CryptoChicks.jpg"
    },
    {
        name: "Crypto Coven",
        image_path: "/collections/CryptoCoven.jpg"
    }
];

export function Dashboard({ userAddress }: any) {

    return (
        <>
            <Header />
            <Container>
                <h2> Dashboard </h2>

                <h4> Supported Collections </h4>

                <CollectionsBox>
                    {CollectionData.map((data) =>
                        <>
                            <img src={data.image_path} alt='' height={225} width={225} />
                        </>
                    )}
                </CollectionsBox>
            </Container>

            <Footer>
                <p> Contact: Longrichk@gmail.com </p>
            </Footer>
        </>
    )


}

export default Dashboard;