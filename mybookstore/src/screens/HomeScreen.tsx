import { useNavigate } from "react-router";
import ProductCorousel from "../components/ProductCorousel";
import { useTranslation } from "react-i18next";
import HowItWorks from "../components/HowItWorks";
import OurServices from "../components/OurServices";
import Showcase from "../components/Showcase";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import BanavooButton from "../components/BanavooButton";
const HomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <ProductCorousel />
      <BanavooButton
        onClick={() => navigate("/customization")}
        text={t("getStarted")}
      />
      <Showcase />
      <HowItWorks />
      <OurServices />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomeScreen;
