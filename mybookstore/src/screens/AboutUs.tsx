import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        padding: "50px 20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "15px",
        }}
      >
        {t("About")} <span style={{ color: "#ff7f50" }}>Banavoo</span>
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: "18px",
          color: "#222",
          marginBottom: "30px",
          lineHeight: "1.6",
        }}
      >
        At <strong>Banavoo</strong>, we believe in turning imagination into
        reality! Whether it's a <strong>custom product</strong>,{" "}
        <strong>a unique design</strong>, or <strong>bulk orders</strong>, we
        craft every detail to perfection. Your{" "}
        <strong>ideas, our innovation!</strong>
      </motion.p>

      {/* Three Core Sections */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {[
          {
            title: "🎯 Our Mission",
            description:
              "To provide a seamless experience in bringing unique and customized products to life.",
          },
          {
            title: "🌟 Our Vision",
            description:
              "To become the go-to platform for personal and business customization needs globally.",
          },
          {
            title: "💡 Why Choose Us?",
            description:
              "We offer fast, high-quality, and personalized solutions with doorstep delivery!",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#ff7f50",
                marginBottom: "10px",
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: "16px", color: "#333" }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
