import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BanavooButtonProps {
  text?: string;
  buttonAlign?: any;
  buttonAnimation?: any;
  bgColor?: string;
  transition?: any;
  onClick?: () => void;
}

const BanavooButton = ({
  text = "Get Started",
  buttonAlign,
  bgColor = "#FACC15",
  onClick,
  transition = {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "mirror",
  },
  buttonAnimation = {
    boxShadow: [
      "0px 0px 10px rgba(255, 215, 0, 0.6)",
      "0px 5px 20px rgba(255, 165, 0, 0.8)",
      "0px 0px 10px rgba(255, 215, 0, 0.6)",
    ],
    y: [0, -5, 0], // Moves the button up and down slightly
  },
}: BanavooButtonProps) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px",
        ...buttonAlign,
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
          animate={buttonAnimation}
          transition={transition}
          style={{
            padding: "16px 32px",
            backgroundColor: bgColor,
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
            onClick && onClick();
          }}
        >
          {text} <ArrowRight className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BanavooButton;
