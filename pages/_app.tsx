import React from "react";
import { AppProps } from "next/app";
import { GlobalStyle } from "../app/css/GlobalStyle";
import { DataProvider } from "../app/context/data/DataProvider";
import { Navigation } from "../app/layout/molecule/Navigation";
import { CustomThemeProvider } from "../app/context/theme/CustomThemeProvider";
import { SessionProvider } from "../app/context/user/SessionProvider";
import { HomeNavigation } from "../app/layout/molecule/HomeNavigation";
import { FeedbackModal } from "../app/layout/molecule/FeedbackModal";
import { Footer } from "../app/layout/atom/Footer";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <SessionProvider>
            <DataProvider>
                <CustomThemeProvider>
                    <GlobalStyle />
                    {pageProps.isLandingPage ? <HomeNavigation /> : <Navigation />}
                    <Component {...pageProps} />
                    <Footer />
                    <FeedbackModal />
                </CustomThemeProvider>
            </DataProvider>
        </SessionProvider>
    );
};

export default App;
