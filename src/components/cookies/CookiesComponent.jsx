import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import React, { useState } from 'react';

const CookiesComponent = () => {
  const [consent, setConsent] = useState(Cookies.get('myAwesomeCookieName2') || false);

  const handleAccept = (acceptedByScrolling) => {
    if (acceptedByScrolling) {
      console.log(getCookieConsentValue("your_custom_cookie_name"));
      alert("Accept was triggered by user scrolling");
    } else {
      alert("Accept was triggered by clicking the Accept button");
    }
    setConsent(true);
    Cookies.set('myAwesomeCookieName2', true, { expires: 150 });
  };

  const handleDecline = () => {
    alert("nay!");
    setConsent(false);
    Cookies.remove('myAwesomeCookieName2');
  };

  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="I Accept"
        onDecline={handleDecline}
        enableDeclineButton
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
        onAccept={handleAccept}
      >
        We cookies to enhance the user experience.{" "}
      </CookieConsent>
      {/* {consent && <p>Cookie consent given!</p>} */}
    </div>
  );
};

export default CookiesComponent;