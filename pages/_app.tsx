import { FC, Fragment } from "react";
import { AppProps } from "next/app";
import { AuthProvider } from "@lib/auth";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import theme from "../styles/theme";

const GlobalStyles: FC = ({ children }) => (
  <Fragment>
    <CSSReset />
    <Global
      styles={css`
        html {
          min-width: 360px;
          scroll-behavior: smooth;
        }

        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}
    />
    {children}
  </Fragment>
);
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
