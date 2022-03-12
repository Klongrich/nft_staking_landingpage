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

                {/* <div className="TeamContainer">
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
                </div> */}

                <div className="FooterContainer">
                    <p> Contact: Longrichk@gmail.com </p>
                </div>

            </div >
        </>
    )
}

export default LandingPage;