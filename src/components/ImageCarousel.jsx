import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const images = [
  { src: "/cities/delhi.PNG", title: "Delhi" },
  { src: "/cities/gurugram.PNG", title: "Gurugram" },
  { src: "/cities/noida.PNG", title: "Noida" },
  { src: "/cities/jaipur.PNG", title: "Jaipur" },
  { src: "/cities/mumbai.PNG", title: "Mumbai" },
  { src: "/cities/rishikesh.PNG", title: "Rishikesh" },
  { src: "/cities/goa.PNG", title: "Goa" },
  { src: "/cities/varanasi.PNG", title: "Varanasi" },
  { src: "/cities/agra.PNG", title: "Agra" },
  { src: "/cities/greaternoida.PNG", title: "Greater Noida" },
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
