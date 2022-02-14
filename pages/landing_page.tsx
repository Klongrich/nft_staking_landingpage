import styled from "styled-components";
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import TeamPhoto from "../public/ProfilePic.png";

import { Twitter } from "@styled-icons/boxicons-logos/Twitter";
import { Github } from "@styled-icons/boxicons-logos/Github"

import RoadMap from "../public/RoadMap2.0.png";

const Header = styled.div`
    background-color: #F4A7A7;
    height: 40px;
    width: 100%;
    margin-top: 0px;
`

const About = styled.div`
    background-color: #CDA3A6;
    width: 100%:

    padding: 20px;
    padding-bottom: 50px;

    margin-top: -40px;

    h2 {
        width: 210px;
        height: 42px;
        font-family: Roboto;
        font-size: 48px;
        line-height: 45px;
        margin-left: 30px;
        padding-top: 40px;
    }

    h3 {
        font-size: 22px;
    }

    ul {
        text-decoratoin: none;
        list-style-type: none;
        text-align: right;
        margin-top: -10px;
        margin-right: 40px;
    }

    li {
        float: right;
        padding-left: 10px;
        padding-right: 10px;
        border-right: 1px solid black;
        padding-bottom: 0px;
        padding-top: 3px;
        text-decoration-line: underline; 
        
        :hover {
            cursor: pointer;
            color: #3A3A3A;
        }
    }

`

const AboutTextBox = styled.div`
    background-color: #CD8285;

    margin-top: 40px;
    margin-bottom: 70px;
    margin-left: 100px;
    margin-right: 100px;

    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;
    padding-bottom: 70px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    p {
        font-size: 30px;
    }

    h3 {
        font-size: 32px;
    }

    padding-left: 100px;
`

const LanuchAppButton = styled.div`
    width: 160px;
    height: 49px;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #C4C4C4;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: inline-block;
    margin-left: 100px;
    
    text-align: center;

    :hover {
        cursor: pointer;
        background-color: #E8E8E8;
    }

    font-size: 18px;

`

const LearnMoreButton = styled.div`
    width: 160px;
    height: 49px;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #C4C4C4;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: inline-block;
    
    text-align: center;

    :hover {
        cursor: pointer;
        background-color: #E8E8E8;
    }

    margin-left: 70%;

    font-size: 18px;

`

const ButtonBox = styled.div`

`

const NavBar = styled.div`
    margin-bottom: 30px;
    width: 100%;
    height: 34px;

    margin-top: -35px;
`

const RoadMapContainer = styled.div`

    background-color: #C4C4C4;
    width: 100%;
    height: 100%;

    text-align: center;

`

const TeamContainer = styled.div`
     background-color: #CDA3A6C9;

     height: 600px;
     width: 100%;

     margin-top: -25px;

     text-align: center;

     h2 {
         padding-top: 40px;
         font-size: 30px;
         padding-bottom: 30px;
         text-decoration: underline;
     }
`

const FooterContainer = styled.div`
    background-color: black;

    width: 100%;
    height: 90px;

    marign-top: -40px;

    padding-top: 30px;
    text-align: center;

    color: white;

`

function LandingPage() {

    return (
        <>
            <div>
                <Header />

                <About>
                    <h2> nft.staking </h2>

                    <NavBar>
                        <ul>
                            <li>About</li>
                            <li>Roadmap</li>
                            <li>Team</li>
                        </ul>
                    </NavBar>
                    <br />
                    <AboutTextBox>
                        {/* <div className={styles.topRightConer}>
                            <div className={styles.rotate} />
                        </div> */}

                        <h3>About ........ </h3>

                        <p>
                            nft.staking is a platform for staking your ERC-721 Tokens
                            for passive Income.
                        </p>

                        {/* 
                        <div className={styles.topLeftConer}>
                            <div className={styles.rotate} />
                        </div> */}

                    </AboutTextBox>

                    <ButtonBox>
                        <LanuchAppButton>
                            <p>Lanuch App</p>
                        </LanuchAppButton>

                        <LearnMoreButton>
                            <p>Learn More</p>
                        </LearnMoreButton>
                    </ButtonBox>
                </About>

                <RoadMapContainer>
                    <img src="/Roadmap2.0.png" alt='' width="100%" />
                </RoadMapContainer>

                <TeamContainer>
                    <h2> Team </h2>

                    <h3> Founder - CEO </h3>

                    <img src="/ProfilePic.png" alt="" height={150} width={173} />

                    <h3> Kyle Longrich</h3>

                    <a href="https://twitter.com/longrichk">
                        <Twitter size={35} color="#1DA1F2" />
                    </a>

                    <a href="https://github.com/klongrich">
                        <Github size={35} color="black" />
                    </a>
                </TeamContainer>

                <FooterContainer>
                    <p> Contact: Longrichk@gmail.com </p>
                </FooterContainer>

            </div>
        </>
    )
}

export default LandingPage;