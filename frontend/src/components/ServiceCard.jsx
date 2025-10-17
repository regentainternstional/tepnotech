import React from "react";

// Import your service images
import devIcon from "../assets/service1.svg";
import ppcIcon from "../assets/service2.svg";
import hostingIcon from "../assets/service3.svg";
import seoIcon from "../assets/service4.svg";
// import digitalIcon from "../assets/service5.svg";
// import smmIcon from "../assets/service6.svg";
// import leadGenIcon from "../assets/service7.svg";
// import brandingIcon from "../assets/service8.svg";
import { useNavigate } from "react-router-dom";

const ServiceCard = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Web Designing",
      image: devIcon,
      description:
        "Create stunning, user-friendly websites that enhance your brand identity and deliver seamless digital experiences.",
      basicPrice: "2000",
    },
    {
      title: "Search Engine Optimization",
      image: ppcIcon,
      description:
        "If you appear first in search engines then you grow & succeed first!",
      basicPrice: "1000",
    },
    {
      title: "Web Development",
      image: hostingIcon,
      description:
        "Our unique and responsive web design enables your website to attract more customers.",
      basicPrice: "1500",
    },
    {
      title: "Graphic Designing",
      image: seoIcon,
      description:
        "Transform ideas into stunning visuals with Graphic Designing — crafting logos, posters, and creatives that make your brand stand out.",
      basicPrice: "1000",
    },
    // {
    //   title: "Digital Marketing",
    //   image: digitalIcon,
    //   description:
    //     "We craft targeted digital marketing strategies that increase your online visibility, drive quality traffic, and maximize ROI.",
    // },
    // {
    //   title: "Social Media Marketing",
    //   image: smmIcon,
    //   description:
    //     "we offers expert Social Media Marketing services to optimize your pages, engage your target audience, drive traffic, generate leads, and boost brand awareness.",
    // },
    // {
    //   title: "Lead Generation",
    //   image: leadGenIcon,
    //   description:
    //     "we offers expert Social Media Marketing services to optimize your pages, engage your target audience, drive traffic, generate leads, and boost brand awareness.",
    // },
    // {
    //   title: "Business Branding",
    //   image: brandingIcon,
    //   description:
    //     "We specialize in creating unique brand identities that capture your vision, build emotional connections, and set you apart from the competition.",
    // },
  ];

  return (
    <section className="py-16 px-4 md:px-10 bg-white">
      <h2 className="text-5xl font-bold text-center mb-14">
        Our Exclusive <span className="text-blue-600">IT Solution</span>{" "}
        Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#f3edff] p-6 rounded shadow-md text-center hover:shadow-lg transition"
          >
            <h3 className="font-bold text-xl mb-4 p-4">{service.title}</h3>
            <img
              src={service.image}
              alt={service.title}
              className="w-32 h-32  mx-auto mb-12"
            />
            <p className="text-base text-gray-700">{service.description}</p>
            <p className="text-gray-700 text-start">
              Basic Price: {service.basicPrice}
            </p>
            <button
              className="bg-pink-300 font-bold mt-10 px-5 py-3 text-black rounded-lg "
              onClick={() =>
                navigate(`/payment/${encodeURIComponent(service.title)}`)
              }
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCard;
