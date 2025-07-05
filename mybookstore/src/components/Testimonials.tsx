import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
const ladiesDummyImage =
  "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740";

const menDummyImage =
  "https://fortmyersradon.com/wp-content/uploads/2019/12/dummy-user-img-1.png";
const testimonials = [
  {
    name: "Shubham Patil",
    feedback:
      "Absolutely loved the customization! The quality exceeded my expectations.",
    image: menDummyImage,
    rating: 5,
  },
  {
    name: "Priya Desai",
    feedback: "Fast delivery and great support. Will order again!",
    image: ladiesDummyImage,
    rating: 4,
  },
  {
    name: "Rahul Roy",
    feedback: "Perfect execution of my idea. Highly recommend their service!",
    image: menDummyImage,
    rating: 5,
  },
  {
    name: "Anjali Singh",
    feedback: "Amazing craftsmanship! My custom mug turned out beautifully.",
    image: ladiesDummyImage,
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const titleStyle = { color: "green", fontWeight: "bold", fontSize: "1.2rem" };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative py-20 bg-gray-900 text-center pt-4">
      <div
        className="p-3 mb-3"
        style={{
          color: "white",
          background: "linear-gradient(45deg, #c804df, transparent)",
        }}
      >
        <motion.h2
          className="text-5xl font-bold mb-10 text-yellow-400"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("testimonials.title")}{" "}
        </motion.h2>
        <motion.p
          className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("testimonials.description")}
        </motion.p>
      </div>

      <motion.div
        className="relative max-w-3xl mx-auto overflow-hidden  pt-4 pb-4  rounded-lg bg-gray-800 p-8 shadow-xl flex flex-col items-center justify-center min-h-[200px]"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <motion.p
          className="text-2xl text-gray-200 font-semibold mb-2 "
          style={titleStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {t("greeting_message")}
        </motion.p>
        <motion.p
          className="text-lg text-gray-400 max-w-xl"
          style={titleStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {t("greeting_message_placeholder")}
        </motion.p>
      </motion.div>
    </div>
  );
}

{
  /* <div className="relative max-w-3xl mx-auto overflow-hidden rounded-lg bg-gray-800 p-8 shadow-xl">
<motion.div
  key={currentIndex}
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -50 }}
  transition={{ duration: 0.5 }}
  className="flex flex-col items-center"
>
  <img
    src={testimonials[currentIndex].image}
    // src="https://fortmyersradon.com/wp-content/uploads/2019/12/dummy-user-img-1.png"
    height={100}
    alt={testimonials[currentIndex].name}
    className="w-24 h-24 object-cover rounded-full border-4 border-yellow-400 mb-4"
  />
  <h3 className="text-2xl font-bold mb-2">
    {testimonials[currentIndex].name}
  </h3>
  <p className="text-gray-300 mb-3">
    {testimonials[currentIndex].feedback}
  </p>
  <div className="flex justify-center gap-1">
    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
      <Star key={i} className="w-5 h-5 " style={{ color: "#130f8b" }} />
    ))}
  </div>
</motion.div>
</div>
<div
className="mt-6 flex justify-center gap-6"
style={{
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  margin: "20px 0px 20px 0px",
}}
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
</div> */
}
