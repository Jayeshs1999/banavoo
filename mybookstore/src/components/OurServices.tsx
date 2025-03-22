import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  FileText,
  Eye,
  Hammer,
  Package,
  Truck,
  Gift,
  Send,
  Layers,
  ShoppingCart,
  Headphones,
  Settings,
} from "lucide-react";
import useDeviceType from "../utils/DeviceType";

const services = [
  {
    title: "Custom Product Design",
    description:
      "Personalize any item with your unique designs, from frames to t-shirts, mugs, and more.",
    icon: <Layers className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Bulk Order Processing",
    description:
      "Accepting large-scale orders for businesses, events, and corporate gifting.",
    icon: <ShoppingCart className="w-12 h-12 text-yellow-500" />,
  },
  {
    title: "Prototype & Sample Creations",
    description:
      "Get a prototype before finalizing your bulk order. Ideal for testing and refinement.",
    icon: <Hammer className="w-12 h-12 text-purple-500" />,
  },
  {
    title: "Full End-to-End Support",
    description:
      "Consultation, design, production, quality check, and fast doorstep delivery.",
    icon: <Headphones className="w-12 h-12 text-green-500" />,
  },
  {
    title: "On-Demand Customization",
    description:
      "Modify existing products or create entirely new ones with our expert team.",
    icon: <Settings className="w-12 h-12 text-teal-500" />,
  },
];

export default function OurServices() {
  const deviceType = useDeviceType();
  return (
    <div className="relative py-20 bg-gray-900 pt-2 ">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 opacity-50"></div>
      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 text-center">
        <div
          className="p-3 mb-3"
          style={{
            color: "white",
            background: "linear-gradient(45deg, red, transparent)",
          }}
        >
          <h2 className="text-5xl font-bold mb-10 text-yellow-400 drop-shadow-lg">
            Our Services
          </h2>
          <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
            From small personalized gifts to large-scale bulk orders, we bring
            your creativity to life.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          style={{
            display: "grid",
            gridTemplateColumns: deviceType !== "mobile" ? "auto auto" : "auto",
            gridTemplateRows: deviceType !== "mobile" ? "auto auto" : "auto",
            gap: "20px",
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }}
              whileInView={{
                backgroundColor: index % 2 === 0 ? "#ffff99" : "#99ffff",
                border: "1px solid darkgreen",
                opacity: 1,
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 rounded-xl shadow-2xl flex flex-col items-center transform hover:scale-105 transition-transform "
              style={{
                padding: "20px",
                borderTopLeftRadius: "50px" /* Rounds the top-left corner */,
                borderBottomRightRadius:
                  "50px" /* Rounds the top-right corner */,
              }}
            >
              <div className="flex justify-center items-center mb-6 w-20 h-20 rounded-full shadow-md">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-700 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
