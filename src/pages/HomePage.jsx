import { Helmet } from "react-helmet-async";
import Banner from "../components/home/Banner";
import Faq from "../components/home/Faq";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Budget Manager | Home</title>
      </Helmet>
      <div className="">
        <Banner />
        <Faq />
      </div>
    </>
  );
};
export default HomePage;
