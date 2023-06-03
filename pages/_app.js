import React from "react"
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

import Layout from "../components/Layout";
import { StateContext } from "@/context/stateContext";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
