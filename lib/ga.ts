import ReactGA from "react-ga4";

export const initGA = () => {
    const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (MEASUREMENT_ID) {
        ReactGA.initialize(MEASUREMENT_ID);
    }
};

export const logPageView = () => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};