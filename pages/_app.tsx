import "../styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from "../lib/auth";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
