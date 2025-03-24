import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessMessage({ message, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        backgroundColor: "#4CAF50",
        color: "#fff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        position: "fixed",
        top: "20px",
        right: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "400px",
        fontSize: "16px",
        zIndex: 1000,
      }}
    >
      <CheckCircle size={28} color="white" />
      <span>{message || "Your request has been sent successfully!"}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </motion.div>
  );
}
