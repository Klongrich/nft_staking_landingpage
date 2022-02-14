import styled from "styled-components";

import { Twitter } from "@styled-icons/boxicons-logos/Twitter";
import { Github } from "@styled-icons/boxicons-logos/Github"

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
    margin-left: 20px;
    margin-right: 20px;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 1px;
    padding-bottom: 40px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    p {
        font-size: 30px;
    }

    h3 {
        font-size: 32px;
    }

    line-height: 2;
`

const LanuchAppButton = styled.div`
    width: 150px;
    height: 55px;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #C4C4C4;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: inline-block;
    margin-left: 20px;
    
    text-align: center;

    :hover {
        cursor: pointer;
        background-color: #E8E8E8;
    }

    font-size: 18px;

`

const LearnMoreButton = styled.div`
    width: 150px;
    height: 55px;

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

    margin-left: 40px;

    display: inline-block;

    font-size: 18px;

`

const ButtonBox = styled.div`

`

const NavBar = styled.div`
    margin-bottom: 30px;
    width: 100%;
    height: 34px;

    margin-bottom: -50px;

    padding-top: 25px;
    margin-top: 35px;
    margin-bottom: -40px;
`

const RoadMapContainer = styled.div`

    z-index: -1;

    background-color: #C4C4C4;
    width: 100%;
    height: 100%;

    text-align: center;

`

const TeamContainer = styled.div`
     background-color: #CDA3A6C9;

     height: 600px;
     width: 100%;

     margin-top: -30px;

     text-align: center;

     h2 {
         padding-top: 30px;
         font-size: 30px;
         padding-bottom: 50px;
         text-decoration: underline;
     }

     h3 {
         font-size: 24px;
     }

     h4 {
        font-size: 20px;
     }
`

const FooterContainer = styled.div`
    background-color: black;

    width: 100%;
    height: 90px;

    marign-top: -40px;

    padding-top: 20px;
    text-align: center;

    color: white;
`

function LandingPage() {

    return (
        <>
            <div>
                <Header />

                <About>

                    <NavBar>
                        <ul>
                            <li>About</li>
                            <li>Roadmap</li>
                            <li>Team</li>
                        </ul>
                    </NavBar>

                    <h2> nft.staking </h2>


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
                    <img src="RoadmapMobile3.png" alt='' width="100%" />
                </RoadMapContainer>

                <TeamContainer>
                    <h2> Team </h2>

                    <h3> Founder - CEO </h3>

                    {/* Image of Sappy */}
                    <img src="/ProfilePic.png" alt="" height={200} width={230} />

                    <h4> Kyle Longrich</h4>

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