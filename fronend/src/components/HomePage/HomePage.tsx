import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ModelConnect } from "../connectArea/ModelConnect";
import instagramIcon from "../../Assets/Icons/instagram_1384073.svg";
import facebookIcon from "../../Assets/Icons/facebook_747543.svg";
import twitterIcon from "../../Assets/Icons/twitter_747622.svg";
import "./homePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/home");
    }
  });
  return (
    <>
      <section className="homeContainer">
        <div className="imageDiv">
          <nav className="navBar">
            <div className="fit">
              <ModelConnect />
            </div>
            <h1 className="title">DISCOVER</h1>
            <h1 className="title1">YOUR TRIP</h1>
            <hr className="hr" />
            <p className="description">Consider you are on the plane</p>
          </nav>

          {/* <div className="socialMedia">
        <hr className='lineSide'/>
        <img className='iconHomePage' src={instagramIcon} width={'25px'} height={'25px'} alt="instagram" />
        <img className='iconHomePage' src={facebookIcon} width={'25px'} height={'25px'} alt="facebook" />
        <img className='iconHomePage' src={twitterIcon} width={'25px'} height={'25px'} alt="twitter" />
      </div> */}
        </div>
      </section>
    </>
  );
};
