import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const showcaseItems = [
  {
    title: "Customized T-Shirt",
    description: "Design your own t-shirt with unique artwork and prints.",
    image:
      "   https://thebanyantee.com/cdn/shop/files/Black-T-shirt.jpg?v=1721380366",
  },
  {
    title: "Customized T-Shirt",
    description: "Design your own t-shirt with unique artwork and prints.",
    image:
      "https://www.deshidukan.in/cdn/shop/files/male-model-wearing-white-tshirt-posing-in-front-pink-curtain-00192_16_1200x1200.jpg?v=1718261128",
  },
  {
    title: "Custom Wooden Frame",
    description:
      "A beautifully crafted wooden frame with personalized engravings.",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/9/344228644/MR/MG/HN/76979556/untitled-design-1-1-500x500.png",
  },
  {
    title: "Wooden Window",
    description: "A beautifully Wooden window .",
    image:
      "https://www.wombatframes.com/cdn/shop/products/Recycled_Australian_timber_handmade_photoframe.jpg?v=1561429374",
  },
  {
    title: "Custom Wooden Frame",
    description:
      "A beautifully crafted wooden frame with personalized engravings.",
    image:
      "https://www.americanframe.com/media/catalog/category/Header-050b.png",
  },
  {
    title: "Custom Wooden Frame",
    description:
      "A beautifully crafted wooden frame with personalized engravings.",
    image:
      "https://www.woodshopdiaries.com/wp-content/uploads/2022/07/Large-custom-framed-photos-on-back-wall.jpg",
  },
  {
    title: "Wooden Table",
    description: "A beautifully crafted wooden table",
    image:
      " https://www.kenro.co.uk/cdn/shop/files/RoundTable_0492__web_grande.jpg?v=1709303843",
  },
  {
    title: "Wooden Table",
    description: "A beautifully crafted wooden table.",
    image:
      " https://www.hindustantimes.com/ht-img/img/2024/05/22/550x309/center_tables_for_living_room_1716354135178_1716354150079.jpg",
  },
  {
    title: "Wooden Table",
    description: "A beautifully crafted wooden table.",
    image:
      "  https://ahdfurniture.com/wp-content/uploads/2024/05/WhatsApp-Image-2025-02-28-at-12.11.14-AM-500x375.jpeg",
  },

  {
    title: "Customized Gift",
    description: "Design your own gift with unique artwork and prints.",
    image:
      "  https://images-cdn.ubuy.co.in/656f644c0a19791e1b1580d2-gift-for-friend-friendship-gifts-for.jpg",
  },
  {
    title: "Customized gift",
    description: "Design your own gift with unique artwork and prints.",
    image:
      "  https://d1jcea4y7xhp7l.cloudfront.net/wp-content/uploads/2024/12/IMG-20241223-WA0000.jpg",
  },
];

export default function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? showcaseItems.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === showcaseItems.length - 1 ? 0 : prev + 1
    );
  };

  // Automatically move the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative py-20 bg-gray-100 text-gray-900 text-center pb-3">
      <div
        className="p-3 mb-3"
        style={{
          color: "white",
          background: "linear-gradient(45deg, red, transparent)",
        }}
      >
        <h2 className="text-5xl font-bold mb-10 text-indigo-600">Showcase</h2>
        <p className="text-lg mb-12 text-gray-600 max-w-2xl mx-auto">
          Explore some of our customized creations to inspire your next idea.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto overflow-hidden rounded-lg shadow-xl">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col items-center bg-white p-8 rounded-lg"
        >
          <img
            height={300}
            // width={500}
            src={showcaseItems[currentIndex].image}
            alt={showcaseItems[currentIndex].title}
            className="w-64 h-64 object-cover rounded-lg shadow-md mb-6"
          />
          <h3 className="text-2xl font-bold mb-2 mt-2">
            {showcaseItems[currentIndex].title}
          </h3>
          <p className="text-gray-600">
            {showcaseItems[currentIndex].description}
          </p>
        </motion.div>
      </div>
      <div
        className="mt-6 flex justify-center gap-6"
        style={{ display: "flex", gap: "10px", justifyContent: "center" }}
      >
        <button
          onClick={prevSlide}
          style={{
            padding: "8px",
            backgroundColor: "#6366F1",
            borderRadius: "999px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            display: "inline-block",
            marginTop: "20px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          style={{
            padding: "8px",
            backgroundColor: "#6366F1",
            borderRadius: "999px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            display: "inline-block",
            marginTop: "20px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
