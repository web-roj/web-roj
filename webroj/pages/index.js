import Head from "next/head";
import Allfeatures from "@/Components/Allfeatures";
import CompanySlider from "@/Components/CompanySlider";
import CustomerReviews from "@/Components/CustomerReviews";
import Imageslider from "@/Components/Imageslider";
import Ourclients from "@/Components/Ourclients";
import Popup from "@/Components/Popup";
import TechStack from "@/Components/TechStack";
import Welcome from "@/Components/Welcome";
import Works from "@/Components/Works";

export default function Home() {
  return (
    <>
      <Head>
        <title>Webroj-Software company</title>
        <meta name="description" content="As a leading IT company, we specialize in delivering innovative solutions that drive growth, enhance efficiency, and elevate the customer experience." />
        {/* Open Graph tags for social media sharing */}
        <meta property="og:About Us" content="Webroj-Software Company" />
        <meta property="og:description" content="As a leading IT company, we specialize in delivering innovative solutions that drive growth, enhance efficiency, and elevate the customer experience." />
        <meta property="og:image" content="URL to your image" />
        <meta property="og:url" content="https://yourwebsite.com" />
        {/* Add more meta tags as needed */}
      </Head>
      <Imageslider />
      <Welcome />
      <TechStack />
      <Popup />
      {/* <Works/> */}
      <Allfeatures />
      <Ourclients />
      <CustomerReviews />
      <CompanySlider />
    </>
  );
}
