import styled from "styled-components";
import styles from '../styles/Home.module.css'

import { Twitter } from "@styled-icons/boxicons-logos/Twitter";
import { Github } from "@styled-icons/boxicons-logos/Github"

import { StyledIconBase } from '@styled-icons/styled-icon'

const IconStyleWrapper = styled.div`
text-align: center;
  
${StyledIconBase} {
    height: 45px;
    width: 45px;
    margin-left: 32px;
    margin-right: 32px;
  }
`

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

    padding-bottom: 55px;

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

    padding-bottom: 55px;

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

    margin-left: 6%;

    font-size: 18px;

`

const ButtonBox = styled.div`
  
`

const NavBar = styled.div`
    margin-bottom: 30px;
    width: 100%;
    height: 34px;

    margin-top: -75px;
    padding-bottom: 10px;
`

const RoadMapContainer = styled.div`

    background-color: #E5E5E5;
    width: 100%;
    height: 100%;

    padding-top: 29px;

    text-align: center;

    border-top: 2px solid black;
    border-bottom: 2px solid black;

`

const TeamContainer = styled.div`
     background-color: #CDA3A6C9;

     height: 500px;
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

const EarnUpToBox = styled.div`

    margin-top: -80px;
    margin-bottom: 60px;

    padding-left: 20px;
    padding-right: 20px;

    padding-top: 30px;
    padding-bottom: 30px;

    margin-left: 10px;
    margin-right: 20px;

    font-size: 30px;

    text-decoration: underline;

    p {
        :hover {
            color: #3A3A3A;
            cursor: pointer;
        }
    }

    
`

const HowItWorks = styled.div`

    padding: 50px;
    margin-bottom: -10px;

    background-color: #CDA3A6;
`


function LandingPage() {

    const scrollToTeam = () => {
        window.scrollTo({ top: 2250, behavior: 'smooth' });
    };

    const scrollToRoadMap = () => {
        window.scrollTo({ top: 1730, behavior: 'smooth' });
    };

    const scrollToLearnMore = () => {
        window.scrollTo({ top: 850, behavior: 'smooth' })
    }

    const scrollToAbout = () => {
        window.scrollTo({ top: 75, behavior: 'smooth' });
    };

    return (
        <>
            <div>
                <Header />

                <About>
                    <h2> nft.stake </h2>

                    <NavBar>
                        <ul>
                            <li onClick={scrollToAbout}>About</li>
                            <li onClick={scrollToRoadMap}>Roadmap</li>
                            <li onClick={scrollToTeam}>Team</li>
                        </ul>
                    </NavBar>
                    <br />

                    <EarnUpToBox>
                        <p> Earn up to 8.2% APY </p>
                    </EarnUpToBox>
                    <AboutTextBox>
                        {/* <div className={styles.topRightConer}>
                            <div className={styles.rotate} />
                        </div> */}

                        <h3>About ........ </h3>

                        <p>
                            nft.stake is a platform for staking your ERC-721 Tokens
                            to earn passive Income.
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

                        <LearnMoreButton onClick={() => scrollToLearnMore()}>
                            <p>Learn More</p>
                        </LearnMoreButton>
                    </ButtonBox>
                </About>

                <HowItWorks>
                    <img src="desktopHowItWorks.png" alt="" width="100%" />
                </HowItWorks>

                <RoadMapContainer>
                    <img src="/Roadmap3.0.png" alt='' width="100%" />
                </RoadMapContainer>

                <TeamContainer>
                    <h2> Team </h2>

                    <h3> Founder - CEO </h3>

                    <img src="/ProfilePic.png" alt="" height={150} width={173} />

                    <h3> Kyle Longrich</h3>

                    <IconStyleWrapper>
                        <a href="https://twitter.com/longrichk">
                            <Twitter size={35} color="#1DA1F2" />
                        </a>

                        <a href="https://github.com/klongrich">
                            <Github size={35} color="black" />
                        </a>
                    </IconStyleWrapper>
                </TeamContainer>

                <FooterContainer>
                    <p> Contact: Longrichk@gmail.com </p>
                </FooterContainer>

            </div>
        </>
    )
}

export default LandingPage;