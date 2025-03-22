import React from "react";
import { useGetTopProductsQuery } from "../slices/productsAPISlice";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
} from "../assets";

const ProductCorousel = () => {
  // const { data: products } = useGetTopProductsQuery("");

  const products = [
    {
      _id: "1",
      name: "Product 1",
      image: banner1,
    },
    // {
    //   _id: "2",
    //   name: "Product 2",
    //   image: banner2,
    // },
    {
      _id: "3",
      name: "Product 3",
      image: banner3,
    },
    {
      _id: "4",
      name: "Product 4",
      image: banner4,
    },
    {
      _id: "5",
      name: "Product 5",
      image: banner5,
    },
    {
      _id: "6",
      name: "Product 6",
      image: banner6,
    },
    {
      _id: "7",
      name: "Product 7",
      image: banner7,
    },
    {
      _id: "8",
      name: "Product 8",
      image: banner8,
    },
    {
      _id: "9",
      name: "Product 9",
      image: banner9,
    },
  ];
  return (
    <Carousel pause="hover" className="bg-error mb-4 carousel-background">
      {products &&
        products.map((product: any) => (
          <Carousel.Item key={product._id} className="custom-carousel-item">
            <Link to={`product/${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                className="custom-image"
              />

              {/* <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} (Rs.{product.price})
                </h2>
              </Carousel.Caption> */}
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ProductCorousel;
