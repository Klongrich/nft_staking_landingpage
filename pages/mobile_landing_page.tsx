import styled from "styled-components";

import { Twitter } from "@styled-icons/boxicons-logos/Twitter";
import { Github } from "@styled-icons/boxicons-logos/Github";

import { StyledIconBase } from '@styled-icons/styled-icon'

import { useRouter } from "next/router";

const IconStyleWrapper = styled.div`
text-align: center;
  
${StyledIconBase} {
    height: 50px;
    width: 50px;
    margin-left: 38px;
    margin-right: 38px;
  }
`

// const Header = styled.div`
//     background-color: #F4A7A7;
//     height: 40px;
//     width: 100%;
//     margin-top: 0px;
// `

// const About = styled.div`
//     background-color: #CDA3A6;
//     width: 100%;

//     padding: 20px;
//     padding-bottom: 50px;

//     margin-top: -40px;

//     h2 {
//         width: 210px;
//         height: 42px;
//         font-family: Roboto;
//         font-size: 48px;
//         line-height: 45px;
//         margin-left: 30px;
//         padding-top: 40px;
//     }

//     h3 {
//         font-size: 22px;
//     }

//     ul {
//         text-decoratoin: none;
//         list-style-type: none;
//         text-align: right;
//         margin-top: -10px;
//         margin-right: 40px;
//     }

//     li {
//         float: right;
//         padding-left: 10px;
//         padding-right: 10px;
//         border-right: 1px solid black;
//         padding-bottom: 0px;
//         padding-top: 3px;
//         text-decoration-line: underline; 

//         :hover {
//             cursor: pointer;
//             color: #3A3A3A;
//         }
//     }

// `

// const AboutTextBox = styled.div`
//     background-color: #CD8285;

//     margin-top: 40px;
//     margin-bottom: 70px;
//     margin-left: 20px;
//     margin-right: 20px;

//     padding-left: 20px;
//     padding-right: 20px;
//     padding-top: 1px;
//     padding-bottom: 40px;

//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

//     p {
//         font-size: 30px;
//     }

//     h3 {
//         font-size: 32px;
//     }

//     line-height: 2;
// `

// const LanuchAppButton = styled.div`
//     width: 150px;
//     height: 55px;

//     background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #C4C4C4;
//     border: 1px solid #000000;
//     box-sizing: border-box;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

//     display: inline-block;
//     margin-left: 20px;

//     text-align: center;

//     :hover {
//         cursor: pointer;
//         background-color: #E8E8E8;
//     }

//     font-size: 18px;

// `

// const LearnMoreButton = styled.div`
//     width: 150px;
//     height: 55px;

//     background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #C4C4C4;
//     border: 1px solid #000000;
//     box-sizing: border-box;
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

//     display: inline-block;

//     text-align: center;

//     :hover {
//         cursor: pointer;
//         background-color: #E8E8E8;
//     }

//     margin-left: 40px;

//     display: inline-block;

//     font-size: 18px;

// `


// const NavBar = styled.div`
//     margin-bottom: 30px;
//     width: 100%;
//     height: 34px;

//     margin-bottom: -50px;

//     padding-top: 25px;
//     margin-top: 35px;
//     margin-bottom: -40px;
// `

// const RoadMapContainer = styled.div`

//     z-index: -1;

//     background-color: #C4C4C4;
//     width: 100%;
//     height: 100%;

//     text-align: center;

// `

// const TeamContainer = styled.div`
//      background-color: #CDA3A6C9;

//      height: 600px;
//      width: 100%;

//      margin-top: -30px;

//      text-align: center;

//      h2 {
//          padding-top: 30px;
//          font-size: 30px;
//          padding-bottom: 50px;
//          text-decoration: underline;
//      }

//      h3 {
//          font-size: 24px;
//      }

//      h4 {
//         font-size: 20px;
//      }
// `

// const FooterContainer = styled.div`
//     background-color: black;
//     width: 100%;

//     padding-top: 20px;
//     padding-bottom: 20px;

//     text-align: center;

//     color: white;

//     p {
//         :hover {
//             color: #0000EE;
//             cursor: pointer;
//         }
//     }
// `

// const EarnUpToBox = styled.div`

//     margin-top: -50px;
//     margin-bottom: 0px;

//     padding-left: 20px;
//     padding-right: 20px;

//     padding-top: 30px;
//     padding-bottom: 30px;

//     margin-left: 10px;
//     margin-right: 20px;

//     font-size: 30px;

//     text-decoration: underline;


//     p {
//         :hover {
//             color: #3A3A3A;
//             cursor: pointer;
//         }
//     }

// `

// const HowItWorks = styled.div`
//     background-color: #CDA3A6;
//     text-align: center;
//     padding-bottom: 20px;
// `

function LandingPage() {

    const scrollToTeam = () => {
        window.scrollTo({ top: 2800, behavior: 'smooth' });
    };

    const scrollToRoadMap = () => {
        window.scrollTo({ top: 1900, behavior: 'smooth' });
    };

    const scrollToLearnMore = () => {
        window.scrollTo({ top: 920, behavior: 'smooth' })
    }

    const scrollToAbout = () => {
        window.scrollTo({ top: 82, behavior: 'smooth' });
    };

    const router = useRouter();

    return (
        <>
            <div>
                <div className="Header" />

                <div className="About">
                    <div className="NavBar">
                        <ul>
                            <li onClick={scrollToAbout}>About</li>
                            <li onClick={scrollToRoadMap}>Roadmap</li>
                            <li onClick={scrollToTeam}>Team</li>
                        </ul>
                    </div>

                    <h2> nft.stake </h2>


                    <br />

                    <div className="EarnUpToBox">
                        Earn up to 8.2% APY
                    </div>
                    <div className="AboutTextBox">

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

                    </div>

                    <div>
                        <div className="LanuchAppButton" onClick={() => router.push('/app')}>
                            <p>Lanuch App</p>
                        </div>

                        <div className="LearnMoreButton" onClick={() => scrollToLearnMore()}>
                            <p>Learn More</p>
                        </div>
                    </div>
                </div>

                <div className="HowItWorks">
                    <img src="HowItWorks4.png" alt="" width="90%" />
                </div>

                <div className="RoadMapContainer">
                    <img src="RoadmapMobile7.png" alt='' width="100%" />
                </div>

                <div className="TeamContainer">
                    <h2> Team </h2>

                    <h3> Founder - CEO </h3>

                    <img src="/ProfilePic.png" alt="" height={200} width={230} />

                    <h4> Kyle Longrich</h4>

                    <IconStyleWrapper>
                        <a href="https://twitter.com/longrichk">
                            <Twitter size={50} color="#1DA1F2" />
                        </a>
                        <a href="https://github.com/klongrich">
                            <Github size={50} color="black" />
                        </a>
                    </IconStyleWrapper>
                </div>

                <div className="FooterContainer">
                    <p> Contact: Longrichk@gmail.com </p>
                </div>

            </div >
        </>
    )
}

export default LandingPage;