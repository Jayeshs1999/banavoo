import { useGetProductsQuery } from "../slices/productsAPISlice";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ProductCorousel from "../components/ProductCorousel";
import { useSelector } from "react-redux";
import OnlineStatusChecker from "../utils/OnlineStatusChecker";
import Meta from "../components/Meta";
import { useTranslation } from "react-i18next";
import useDeviceType from "../utils/DeviceType";
import HowItWorks from "../components/HowItWorks";
import OurServices from "../components/OurServices";
import Showcase from "../components/Showcase";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const HomeScreen = () => {
  const { t } = useTranslation();
  const deviceType = useDeviceType();
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl px-6 md:px-12 lg:px-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0px 0px 10px rgba(255, 215, 0, 0.6)",
                "0px 5px 20px rgba(255, 165, 0, 0.8)",
                "0px 0px 10px rgba(255, 215, 0, 0.6)",
              ],
              y: [0, -5, 0], // Moves the button up and down slightly
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              padding: "16px 32px",
              backgroundColor: "#FACC15",
              color: "#1F2937",
              fontWeight: "bold",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontSize: "18px",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => {
              navigate("/customization");
            }}
          >
            Get Started <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      <Showcase />
      <HowItWorks />
      <OurServices />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomeScreen;
