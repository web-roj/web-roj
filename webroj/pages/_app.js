import Layout from "@/Components/Layout";
import Head from "next/head";
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        
 
      <title>Webroj-Software company</title>
      <meta name="description" content="As a leading IT company, we specialize in delivering innovative solutions that drive growth, enhance efficiency, and elevate the customer experience." />
  
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"  />

  
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

 
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

 
  <link rel="manifest" href="/site.webmanifest" />
</Head>
        {/* Add more meta tags as needed */}
      
      <Layout>
      <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
