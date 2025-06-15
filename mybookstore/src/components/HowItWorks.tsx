import { motion } from "framer-motion";
import { FileText, Eye, Hammer, Package, Truck, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    {
      title: t("form.fillInstruction"),
      description: t("form.instruction"),
      icon: (
        <FileText
          className="w-10 h-10 text-blue-500"
          style={{ color: "#242489" }}
        />
      ),
      color: "#242489",
    },
    {
      title: t("status.pendingReview"),
      description: t("status.pendingReviewDesc"),
      icon: (
        <Eye
          className="w-10 h-10 text-yellow-500"
          style={{ color: "#e7663c" }}
        />
      ),
      color: "#e7663c",
    },
    {
      title: t("status.underReview"),
      description: t("status.underReviewDesc"),
      icon: (
        <Eye
          className="w-10 h-10 text-orange-500"
          style={{ color: "#FFA500" }}
        />
      ),
      color: "#FFA500",
    },
    {
      title: t("status.inProgress"),
      description: t("status.inProgressDesc"),
      icon: (
        <Hammer
          className="w-10 h-10 text-purple-500"
          style={{ color: "#800080" }}
        />
      ),
      color: "#800080",
    },
    {
      title: t("status.qualityCheck"),
      description: t("status.qualityCheckDesc"),
      icon: (
        <Package
          className="w-10 h-10 text-green-500"
          style={{ color: "#008000" }}
        />
      ),
      color: "#008000",
    },
    {
      title: t("status.outForDelivery"),
      description: t("status.outForDeliveryDesc"),
      icon: (
        <Truck
          className="w-10 h-10 text-indigo-500"
          style={{ color: "#4B0082" }}
        />
      ),
      color: "#4B0082",
    },
    {
      title: t("status.delivered"),
      description: t("status.deliveredDesc"),
      icon: (
        <Gift
          className="w-10 h-10 text-teal-500"
          style={{ color: "#008080" }}
        />
      ),
      color: "#008080",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 px-6 md:px-12 lg:px-20 text-center">
      <h2
        className="text-4xl md:text-4xl font-bold text-gray-800 mb-8 pt-3 pb-3 "
        style={{
          color: "white",
          background: "linear-gradient(45deg, red, transparent)",
        }}
      >
        {t("howItWorks")}
      </h2>
      <div className="grid md:grid-cols-4 gap-6 mt-3">
        {steps?.map((step, index) => (
          <>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-4 pt-3">
                <div className="flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-blue-500 ">
                  {step.icon}
                </div>
              </div>
              <h3
                className="text-xl font-semibold text-gray-700 mb-2"
                style={{ color: step.color }}
              >
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm pb-3 px-3">
                {step.description}
              </p>
            </motion.div>
          </>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
