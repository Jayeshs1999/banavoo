import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  tshirt1,
  tshirt2,
  // tshirt3,
  // tshirt4,
  // tshirt5,
  office1,
  office2,
  // office3,
  creative1,
  creative2,
  creative3,
  // creative4,
  // creative5,
  // art,
  art1,
  art2,
  art3,
  // art4,
  bag1,
  bag2,
  // bag3,
  ladies1,
  ladies2,
  // ladies3,
  fur1,
  fur2,
  fur3,
  // fur4,
  suit,
  // logo,
  logo1,
  website1,
  website2,
  box1,
  d3,
  // Image,
  // adv,
} from "../assets";
import { useState } from "react";

const showcaseItems = [
  {
    title: "T-Shirt Collection",
    description: "Design your own t-shirt with unique artwork and prints.",
    image: tshirt1,
  },
  {
    title: "Office Collection",
    description: "Professional wear for the modern workplace.",
    image: office1,
  },
  {
    title: "Creative Designs",
    description: "Unique and artistic designs for your style.",
    image: creative1,
  },
  {
    title: "Artistic Collection",
    description: "Express yourself with our artistic designs.",
    image: art1,
  },
  {
    title: "Bag Collection",
    description: "Stylish and functional bags for every occasion.",
    image: bag1,
  },
  {
    title: "Ladies Collection",
    description: "Elegant designs for women.",
    image: ladies1,
  },
  {
    title: "Fur Collection",
    description: "Luxurious fur designs for special occasions.",
    image: fur1,
  },
  {
    title: "Professional Suits",
    description: "Premium suits for the modern professional.",
    image: suit,
  },
  {
    title: "Website Designs",
    description: "Modern and responsive website designs.",
    image: website1,
  },
  {
    title: "Box Collection",
    description: "Unique box designs for special occasions.",
    image: box1,
  },
  {
    title: "3D Designs",
    description: "Innovative 3D designs for your needs.",
    image: d3,
  },
];

const alternativeShowcaseItems = [
  {
    title: "T-Shirt Collection 2",
    description: "More unique t-shirt designs for you.",
    image: tshirt2,
  },
  {
    title: "Office Style 2",
    description: "Additional office wear options.",
    image: office2,
  },
  {
    title: "Creative Designs 2",
    description: "More creative options for your style.",
    image: creative2,
  },
  {
    title: "Art Collection 2",
    description: "Additional artistic designs.",
    image: art2,
  },
  {
    title: "Bag Collection 2",
    description: "More bag designs to choose from.",
    image: bag2,
  },
  {
    title: "Ladies Collection 2",
    description: "More elegant designs for women.",
    image: ladies2,
  },
  {
    title: "Fur Collection 2",
    description: "Additional fur designs.",
    image: fur2,
  },
  {
    title: "Website Designs 2",
    description: "More website design options.",
    image: website2,
  },
  {
    title: "Logo Designs",
    description: "Professional logo designs.",
    image: logo1,
  },
  {
    title: "Art Collection 3",
    description: "Premium artistic designs.",
    image: art3,
  },
  {
    title: "Creative Designs 3",
    description: "Innovative creative designs.",
    image: creative3,
  },
  {
    title: "Fur Collection 3",
    description: "Luxurious fur designs.",
    image: fur3,
  },
];

export default function Showcase() {
  const { t } = useTranslation();
  const [showAlternative, setShowAlternative] = useState(false);

  // Duplicate items for infinite effect
  const duplicatedItems = showAlternative
    ? [...alternativeShowcaseItems, ...alternativeShowcaseItems]
    : [...showcaseItems, ...showcaseItems];

  return (
    <div className="relative py-20 bg-gray-100 text-gray-900 text-center overflow-hidden">
      <div
        className="p-3 mb-3"
        style={{
          color: "white",
          background: "linear-gradient(45deg, red, transparent)",
        }}
      >
        <h2 className="text-5xl font-bold mb-4 text-indigo-600">
          {t("showCase")}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t(
            "Explore_some_of_our_customized_creations_to_inspire_your_next_idea"
          )}
        </p>
        <button
          onClick={() => setShowAlternative(!showAlternative)}
          className="mt-4 px-6 py-2  rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {showAlternative
            ? "Show First Collection"
            : "Show Alternative Collection"}
        </button>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
          style={{ width: "max-content", display: "flex" }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white p-4 rounded-xl shadow-md flex-shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "200px", height: "200px" }}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
