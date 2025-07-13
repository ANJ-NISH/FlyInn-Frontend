import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const images = [
  { src: "../public/cities/delhi.png", title: "Delhi" },
  { src: "../public/cities/gurugram.png", title: "Gurugram" },
  { src: "../public/cities/noida.png", title: "Noida" },
  { src: "../public/cities/jaipur.png", title: "Jaipur" },
  { src: "../public/cities/mumbai.png", title: "Mumbai" },
  { src: "../public/cities/rishikesh.png", title: "Rishikesh" },
  { src: "../public/cities/goa.png", title: "Goa" },
  { src: "../public/cities/varanasi.png", title: "Varanasi" },
  { src: "../public/cities/agra.png", title: "Agra" },
  { src: "../public/cities/greaternoida.png", title: "Greater Noida" },
];

const ImageCarousel = () => {
  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}  // Default for mobile
        spaceBetween={10}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="my-6"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="text-center">
            <Link to="/searchresult" state={img.title}>
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-32 object-cover rounded-lg"
            />
            </Link>
            
            <p className="mt-2 text-sm font-semibold">{img.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
