import { useGetProductsQuery } from "../slices/productsAPISlice";
import { useNavigate, useParams } from "react-router";
import ProductCorousel from "../components/ProductCorousel";
import { useSelector } from "react-redux";
import Meta from "../components/Meta";
import { useTranslation } from "react-i18next";
import useDeviceType from "../utils/DeviceType";
import HowItWorks from "../components/HowItWorks";
import OurServices from "../components/OurServices";
import Showcase from "../components/Showcase";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import BanavooButton from "../components/BanavooButton";
const HomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pageNumber, keyword, categoryName } = useParams();

  const { data, isLoading, error, isFetching } = useGetProductsQuery({
    keyword,
    pageNumber,
    categoryName,
  });
  const { isOnline } = useSelector((state: any) => state.status);

  return (
    <>
      <ProductCorousel />
      <BanavooButton onClick={() => navigate("/customization")} />
      <Showcase />
      <HowItWorks />
      <OurServices />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomeScreen;
