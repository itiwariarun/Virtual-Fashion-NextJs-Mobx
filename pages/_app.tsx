import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "mobx-react";
import Navbar from "@/packages/components/Navbar";
import Footer from "@/packages/components/Footer";
import { contentStore } from "@/packages/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider contentStore={contentStore}>
      <div className="min-h-screen bg-main h-full grid content-between">
        <Navbar />
        <Component {...pageProps} /> <Footer />
      </div>
    </Provider>
  );
}
