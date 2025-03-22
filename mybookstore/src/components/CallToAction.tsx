import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CallToAction() {
  const navigate = useNavigate();
  return (
    <div className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-800  text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto px-6 md:px-12 lg:px-20"
      >
        <div
          className="p-3 mb-3"
          style={{
            color: "white",
            background: "linear-gradient(90deg, red, transparent)",
          }}
        >
          <h2 className="text-5xl font-bold mb-6">Start Customizing Now!</h2>
          <p className="text-lg mb-8 text-gray-200">
            Turn your ideas into reality with our seamless customization
            process. Let's create something unique together!
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
            margin: "0 auto",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            border: "none",
            transition: "background 0.3s ease",
          }}
          onClick={() => {
            navigate("/customization");
          }}
        >
          Get Started <ArrowRight className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}
