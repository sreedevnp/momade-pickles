import logo from "./assets/logo.png";

import chickenPickle from "./assets/chicken-pickle.png";
import prawnPickle from "./assets/prawn-pickle.png";
import beefPickle from "./assets/beef-pickle.png";
import sailfishPickle from "./assets/ola.png";
import tunaPickle from "./assets/kera-pickle.png";
import datesPickle from "./assets/datelemon.png";
import jkpickle from "./assets/jack.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Success from "./Success";

import { Link } from "react-router-dom";

import heroBg from "./assets/hero-bg.jpg";

import discover1 from "./assets/discover1.png";
import discover2 from "./assets/discover2.png";
import discover3 from "./assets/discover3.png";
import discover4 from "./assets/discover4.png";

import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";

import { HiMenu, HiX } from "react-icons/hi";

import { motion } from "framer-motion";

import { FaWhatsapp } from "react-icons/fa";

import "swiper/css";

const products = [
  {
    name: "Boneless Chicken Miracle",
    image: chickenPickle,
    price: "₹1",
    oldPrice: "₹799",
    weight: "500g",
  },

  {
    name: "Prawn Pickle",
    image: prawnPickle,
    price: "₹650",
    oldPrice: "₹799",
    weight: "500g",
  },

  {
    name: "Beef Pickle",
    image: beefPickle,
    price: "₹800",
    oldPrice: "₹999",
    weight: "500g",
  },

  {
    name: "Dates Lemon Pickle",
    image: datesPickle,
    price: "₹400",
    oldPrice: "₹550",
    weight: "500g",
  },

  {
    name: "Kera (Tuna) Pickle",
    image: tunaPickle,
    price: "₹650",
    oldPrice: "₹799",
    weight: "500g",
  },

  {
    name: "Olakodiyan (Sailfish) Pickle",
    image: sailfishPickle,
    price: "₹650",
    oldPrice: "₹799",
    weight: "500g",
  },

  {
    name: "Chakka Varattiyathu",
    image: jkpickle,
    price: "₹650",
    oldPrice: "₹799",
    weight: "500g",
  },
];



function App() {
  const { cart, addToCart } = useCart();
  console.log(cart);

  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "products", "about", "contact"];

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); 
    } else {
      setShowNavbar(true); 
    }

    lastScrollY = window.scrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  if (window.location.hash === "#products") {
    const section = document.getElementById("products");

    if (section) {
      setTimeout(() => {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }
}, []);

  return (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#FFF8F0] min-h-screen">
        <nav
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
          } ${
          scrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-6 py-3 flex items-center justify-between">

            <img
              src={logo}
              alt="Momade"
              className="h-12 md:h-20 w-auto"
            />

            <div className="hidden md:flex items-center gap-10 ml-auto text-white text-lg">

              <a
                href="#home"
                onClick={() => setActive("home")}
                className={`${
                active === "home"
                ? "text-[#D4A017] border-b-2 border-[#D4A017]"
                : "text-white"
                } pb-1 transition`}
              >
                Home
              </a>

              <a
                href="#products"
                onClick={() => setActive("products")}
                className={`${
                active === "products"
                ? "text-[#D4A017] border-b-2 border-[#D4A017]"
                : "text-white"
                } pb-1 transition`}
              >
                Products
              </a>

              <Link
                to="/contact"
                className="text-white hover:text-[#D4A017] transition"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center justify-center"
              >
                <span className="text-3xl">
                  🛒
                </span>

                {cart.length > 0 && (
                <span
                  className="absolute-top-3-right-3
                  w-8
                  h-8
                  rounded-full
                  bg-[#D4A017]
                  text-black
                  font-bold
                  text-sm
                  flex
                  items-center
                  justify-center
                  shadow-lg"
                >
                  {cart.length}
                </span>
                )}
              </Link>
            </div>  
    
            <div className="flex items-center gap-4">

              <Link to="/cart"className="md:hidden relative text-2xl text-[#D4A017]">
                🛒
                {cart.length > 0 && (
                  <span className="absolute-top-2-right-2
                    w-5
                    h-5
                    rounded-full
                    bg-[#D4A017]
                    text-black
                    text-xs
                    font-bold
                    flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>

              <button onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden
                  w-11
                  h-11
                  rounded-full
                  bg-black/20
                  backdrop-blur-xl
                  border border-[#D4A017]/40
                  flex items-center justify-center
                  text-[#D4A017]
                  text-2xl
                  shadow-lg
                  hover:bg-[#D4A017]/10
                  transition-all duration-300">
                    {menuOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden
                absolute
                top-20
                right-4 w-64
                rounded-2xl
                overflow-hidden bg-black/40
                backdrop-blur-2xl
                border border-white/10
                shadow-2xl">

              <a href="#home"
                onClick={() => {
                  setActive("home");
                  setMenuOpen(false);
                }}
                className={`block px-6 py-4 border-b border-white/10 transition-all duration-300 ${
                  active === "home"
                  ? "text-[#D4A017]"
                  : "text-white hover:text-[#D4A017]"
                }`}>
                Home
              </a>

              <a
                href="#products"
                onClick={() => {
                setActive("products");
                setMenuOpen(false);
                }}
                className={`block px-6 py-4 border-b border-white/10 transition-all duration-300 ${
                active === "products"
                ? "text-[#D4A017]"
                : "text-white hover:text-[#D4A017]"
                }`}>
                Products
              </a>

              <Link to="/contact"
                onClick={() => {
                  setActive("contact");
                  setMenuOpen(false);
                }}
                className={`block px-6 py-4 transition-all duration-300 ${
                  active === "contact"
                  ? "text-[#D4A017]"
                  : "text-white hover:text-[#D4A017]"
                }`}>
                Contact
              </Link>
            </div>
          )}
        </nav>
      
        <section id="home"
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{
          backgroundImage: `url(${heroBg})`,
          }}>
  
          <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

              <div className="text-center">

                <p className="text-[#D4A017] uppercase tracking-[5px] mb-4 pt-12">
                  Momade premium quality homemade pickles
                </p>

                <h1 className="text-white text-6xl md:text-8xl font-light leading-tight"
                  style={{ fontFamily: "Cormorant Garamond" }}>
                    Taste The
                    <br />
                    Tradition Of
                    <br />
                    Kerala
                </h1>

                <p className="text-gray-200 max-w-2xl mx-auto mt-8 text-lg">
                  Handcrafted homemade pickles made using
                  premium ingredients, traditional recipes,
                  and generations of Kerala culinary expertise.
                </p>

                <div className="mt-10">
                  <a href="#products"
                    className="bg-[#8B1E3F] text-white px-8 py-4 rounded-full 
                    text-lg font-medium hover:bg-[#6D1731]">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#F8F4EE] py-24" id="products">
            <div className="max-w-7xl mx-auto px-6">

              <h2 className="text-5xl text-center text-[#8B1E3F] mb-16">
                Our Pickles
              </h2>

              <div className="flex justify-center mb-12">
                <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-gray-200 shadow-sm">
                  <span className="text-[#D4A017]">✔</span>
                  <span className="text-gray-600 text-sm md:text-base">
                    FSSAI Lic. No: 2132416700063
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-20">      
                {products.map((product, index) => (
                <div key={index} className="text-center">

                  <div className="h-[320px] flex items-center justify-center">
                    <img src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"/>
                  </div>

                  <h3 className="mt-4 text-2xl text-[#8B1E3F]">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex flex-col items-center">

                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through text-xl">
                        {product.oldPrice}
                      </span>

                      <span className="text-3xl font-bold text-[#D4A017]">
                        {product.price}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      / {product.weight}
                    </p>
                  </div>  

                  <button onClick={() => {
                    addToCart(product);
                    setAddedMessage(
                    `${product.name} added to cart`
                    );
                    setTimeout(() => {
                    setAddedMessage("");
                    }, 2000);
                    }}
                    className="inline-block mt-5 px-8 py-3 border border-[#8B1E3F] 
                    text-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white transition">
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      
        <section className="bg-[#111] text-white py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
            <div>
              <img src={discover4}
              alt="Pickle Preparation"
              className="w-full h-full object-cover"/>
            </div>

            <div className="bg-[#8B1E3F] p-16 flex flex-col justify-center">
              <p className="uppercase tracking-[4px] text-[#F4D03F] mb-4">
                Our Process
              </p>

              <h2 className="text-5xl mb-10"
                style={{ fontFamily: "Cormorant Garamond" }}>
                Crafted With Tradition
              </h2>

              <div className="space-y-8">

                <div className="flex gap-5">
                  <span className="text-[#F4D03F] text-3xl">01</span>
                <div>
                  <h3 className="text-2xl mb-2">
                    Fresh Ingredients
                  </h3>
                  <p className="text-gray-200">
                    Premium meat, fish, prawns and spices selected daily.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <span className="text-[#F4D03F] text-3xl">02</span>
              <div>
              <h3 className="text-2xl mb-2">
                Traditional Marination
              </h3>
              <p className="text-gray-200">
                Authentic Kerala spice blends and recipes.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <span className="text-[#F4D03F] text-3xl">03</span>
          <div>
          <h3 className="text-2xl mb-2">
            Slow Cooking
          </h3>
          <p className="text-gray-200">
            Prepared in small batches for rich flavour.
          </p>
        </div>
      </div>

      <div className="flex gap-5">
        <span className="text-[#F4D03F] text-3xl">04</span>
      <div>
      <h3 className="text-2xl mb-2">
        Packed Fresh
      </h3>
      <p className="text-gray-200">
        Sealed carefully to preserve freshness and taste.
      </p>
    </div>
  </div>

</div>

</div>

</div>
</section>


<section className="bg-black py-24">
  <div className="max-w-7xl mx-auto px-6">

    <p className="text-center text-[#D4A017] uppercase tracking-[4px] mb-4">
      Discover Momade
    </p>

    <h2
      className="text-center text-white text-7xl mb-16"
      style={{ fontFamily: "Cormorant Garamond" }}>
      Authentic Kerala Flavours
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="group overflow-hidden">
        <img
          src={discover1}
          alt=""
          className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"/>

        <h3 className="text-white text-3xl mt-5">
          Homemade Quality
        </h3>
      </div>

      <div className="group overflow-hidden">
        <img
          src={discover2}
          alt=""
          className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"/>

        <h3 className="text-white text-3xl mt-5">
          Premium Ingredients
        </h3>
      </div>

      <div className="group overflow-hidden">
        <img
          src={discover3}
          alt=""
          className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"/>

        <h3 className="text-white text-3xl mt-5">
          Traditional Recipes
        </h3>
      </div>

    </div>
  </div>
</section>

{addedMessage && (
  <div
    className="fixed bottom-24 right-6
      z-[999] bg-[#8B1E3F] text-white
      px-6
      py-3
      rounded-2xl
      shadow-2xl">
      ✓ {addedMessage}
  </div>
)}

<footer className="bg-black text-white pt-12 pb-6">

  <div className="max-w-7xl mx-auto px-6">

    
    <div className="flex justify-center mb-10">
      <img
        src={logo}
        alt="Momade"
        className="h-40 w-auto"
      />
    </div>

    
    <div className="border-t border-white/20 mb-10"></div>

    
    <div className="grid md:grid-cols-4 gap-12">

     
      <div>
        <h2 className="text-4xl text-[#D4A017] font-bold mb-4">
          MOMADE
        </h2>

        <p className="text-white/80 leading-8">
          Authentic homemade pickles crafted using traditional Kerala
          recipes, premium ingredients and lots of love.
        </p>
      </div>

      
      <div>
        <h3 className="text-2xl text-[#D4A017] font-semibold mb-4">
          Address
        </h3>

        <p className="text-white/80">
          Momade Homemade Pickles
        </p>

        <p className="text-white/80 mt-2">
          Kottayam, Kerala
        </p>

        <p className="text-white/80 mt-2">
          PIN: 686604
        </p>

        <p className="text-white/80 mt-2">
  FSSAI Lic. No: 2132416700063
</p>
      </div>

      
      <div>
        <h3 className="text-2xl text-[#D4A017] font-semibold mb-4">
          Contact Us
        </h3>

        <p className="text-white/80">
          📞 +91 8281274530
        </p>

        <p className="text-white/80 mt-3 break-all">
          📧 momadepickles1@gmail.com
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-2xl text-[#D4A017] font-semibold mb-4">
          Quick Links
        </h3>

        <div className="space-y-3">
          <a
            href="#home"
            className="block text-white/80 hover:text-[#D4A017] transition"
          >
            Home
          </a>

          <a
            href="#products"
            className="block text-white/80 hover:text-[#D4A017] transition"
          >
            Products
          </a>

    

          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="block text-white/80 hover:text-[#D4A017] transition">
            Contact
          </Link>
        </div>
      </div>

    </div>

    <div className="border-t border-white/20 mt-10 pt-6">

      <p className="text-center text-white/80">
        © Momade Homemade Pickles. All rights reserved.
      </p>

      <p className="text-center text-white/60 mt-2">
        Crafted with ❤️ and Authentic Kerala Flavours
      </p>

    </div>

  </div>

</footer>
<a
  href="https://wa.me/918281274530"
  target="_blank"
  rel="noreferrer"
  className="
    fixed
    bottom-6
    right-6
    z-50
    w-16
    h-16
    rounded-full
    flex
    items-center
    justify-center
    bg-white/10
    backdrop-blur-xl
    border
    border-white/20
    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
    hover:scale-110
    hover:bg-white/20
    transition-all
    duration-300">
  <FaWhatsapp
    size={32}
    className="text-[#25D366]"/>
</a>
    </div>
    </motion.div>
  );
}

export default App;