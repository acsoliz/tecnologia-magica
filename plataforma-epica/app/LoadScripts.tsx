'use client'

import ReactGA from "react-ga";
import {hotjar} from "react-hotjar";
import {CookieConsent} from "react-cookie-consent";

export default function LoadScripts() {

    function handleAcceptCookie() {
        ReactGA.initialize('G-FT95DENXKJ');
        ReactGA.pageview(window.location.pathname + window.location.search);

        hotjar.initialize(3801776, 6)
    }

    return (
            <CookieConsent
                buttonText={"I agree"}
                declineButtonText={"Decline"}
                onAccept={handleAcceptCookie}
                enableDeclineButton
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
                buttonStyle={{ fontSize: "20px", padding: "20px" }}
                declineButtonStyle={{ color: "#c5c5c5", fontSize: "13px", background: "transparent" }}
            >
                This website uses cookies to enhance the user experience{" "}
                <a href="/privacy-and-terms" style={{ fontSize: "10px" }}>+ info</a>
            </CookieConsent>
    )
}
