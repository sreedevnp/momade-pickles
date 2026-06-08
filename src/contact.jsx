import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

import { motion } from "framer-motion";

function Contact() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [showNavbar, setShowNavbar] = useState(true);

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

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
    <>
      
      <nav className={`
    fixed
    left-0
    w-full
    z-50
    bg-black/80
    backdrop-blur-md
    shadow-lg
    transition-all
    duration-300
    ${
      showNavbar
        ? "top-0 opacity-100"
        : "-top-32 opacity-0"
    }
  `}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <img
            src={logo}
            alt="Momade"
            className="h-24 md:h-20 w-auto"/>

<div className="hidden md:flex gap-10 text-white text-lg">

  <a
    href="/"
    className="hover:text-[#D4A017] transition">
    Home
  </a>

  <a
    href="/#products"
    className="hover:text-[#D4A017] transition">
    Products
  </a>

  <a
    href="/contact"
    className="text-[#D4A017] border-b-2 border-[#D4A017] pb-1">
    Contact
  </a>

</div>

<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="
    md:hidden
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
      </nav>

      {menuOpen && (
  <div
    className="
      md:hidden
      fixed
      top-20
      right-4
      w-64
      rounded-2xl
      overflow-hidden
      bg-black/40
      backdrop-blur-2xl
      border border-white/10
      shadow-2xl
      z-50">

    <a
      href="/"
      onClick={() => setMenuOpen(false)}
      className="
        block
        px-6
        py-4
        text-white
        border-b border-white/10
        hover:text-[#D4A017]">
      Home
    </a>

    <a
      href="/#products"
      onClick={() => setMenuOpen(false)}
      className="
        block
        px-6
        py-4
        text-white
        border-b border-white/10
        hover:text-[#D4A017]">
      Products
    </a>

    <Link
      to="/contact"
      onClick={() => setMenuOpen(false)}
      className="
        block
        px-6
        py-4
        text-[#D4A017]">
      Contact
    </Link>

  </div>
)}

      <section className="bg-[#F8F4EE] min-h-screen pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <p className="text-[#D4A017] uppercase tracking-[4px] mb-3">
              Get In Touch
            </p>

            <h1
            className="text-4xl md:text-6xl text-[#8B1E3F] mb-6"
            style={{ fontFamily: "Cormorant Garamond" }}>
              Contact Momade
            </h1>

            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-8">
              For bulk orders, wholesale enquiries, gifting requirements,
              dealership opportunities, or any questions regarding our
              homemade pickles, feel free to contact us. Our team is happy
              to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">

            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl text-[#8B1E3F] mb-8">
                Contact Information
              </h2>

              <div className="space-y-8 text-lg">

                <div>
                  <div className="font-bold text-xl flex items-center gap-2">
                    📞 Call Us
                  </div>
                  <div className="mt-2 text-gray-700">
                    +91 8281274530
                  </div>
                </div>

                <div>
                  <div className="font-bold text-xl flex items-center gap-2">
                    💬 WhatsApp
                  </div>
                  <div className="mt-2 text-gray-700">
                    +91 8281274530
                  </div>
                </div>

                <div>
                  <div className="font-bold text-xl flex items-center gap-2">
                    📧 Email
                  </div>
                  <div className="mt-2 text-gray-700 break-all">
                    momadepickles1@gmail.com
                  </div>
                </div>

                <div>
                  <div className="font-bold text-xl flex items-center gap-2">
                    📍 Location
                  </div>
                  <div className="mt-2 text-gray-700">
                    Kottayam, Kerala
                  </div>
                </div>
                <div>
              <div className="font-bold text-xl flex items-center gap-2">
                🛡️ FSSAI License
              </div>
              <div className="mt-2 text-gray-700">
                2132416700063
              </div>
            </div>

              </div>
            </div>

            <div className="bg-[#8B1E3F] text-white rounded-3xl p-10 max-w-xl">
              <h3 className="text-2xl md:text-3xl mb-4">
                Bulk Orders & Special Requests
              </h3>

              <p className="text-base md:text-lg leading-7 text-white/90">
                Looking for bulk quantities for events, weddings,
                corporate gifting, supermarkets, restaurants or
                retail stores? Contact us directly for special
                pricing and customised orders.
              </p>

              <a
              href="https://wa.me/918281274530"
              target="_blank"
              rel="noreferrer"
              className="
                inline-block
                mt-8
                bg-[#D4A017]
                text-black
                px-10
                py-4
                rounded-full
                font-semibold
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-2xl
                hover:bg-[#E5B321]">
              Chat on WhatsApp
            </a>
            </div>

          </div>

        </div>
      </section>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="relative">

            <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3931.9847770262522!2d76.49227677502809!3d9.767354990326517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNDYnMDIuNSJOIDc2wrAyOSc0MS41IkU!5e0!3m2!1sen!2sin!4v1780764090814!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"/>


              </div>

              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#8B1E3F]">
                  Momade Homemade Pickles
                </h3>

                <p className="mt-4 text-gray-700">
                  📍 Kottayam, Kerala
                </p>

                <div className="mt-6 border rounded-xl p-4 bg-gray-50">
                  📞 +91 8281274530
                </div>
                <a
              href="https://maps.app.goo.gl/yd6ir4TiW62dMVTJ6"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-[#8B1E3F] text-white px-6 py-3 rounded-full hover:bg-[#6f1832] transition">
          📍 Open in Google Maps
        </a>
          </div>

        </div>
              <footer className="bg-black text-white pt-12 pb-6 mt-20">

          <div className="max-w-7xl mx-auto px-6">

            {/* Logo */}
            <div className="flex justify-center mb-10">
              <img
                src={logo}
                alt="Momade"
                className="h-40 w-auto"
              />
            </div>

            {/* Top Border */}
            <div className="border-t border-white/20 mb-10"></div>

            {/* Footer Content */}
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

              <div>
                <h3 className="text-2xl text-[#D4A017] font-semibold mb-4">
                  Quick Links
                </h3>

                <div className="space-y-3">
                  <a
                    href="/"
                    className="block text-white/80 hover:text-[#D4A017] transition">
                    Home
                  </a>

                <a
          href="/#products"
          className="block text-white/80 hover:text-[#D4A017] transition">
          Products
        </a>

                  <a
                    href="/contact"
                    className="block text-[#D4A017]">
                    Contact
                  </a>
                  
                </div>
      </div>

    </div>


    <div className="border-t border-white/20 mt-10 pt-6">

      <p className="text-center text-white/80">
        © 2026 Momade Homemade Pickles. All rights reserved.
      </p>

      <p className="text-center text-white/60 mt-2">
        Crafted with ❤️ and Authentic Kerala Flavours
      </p>

    </div>

  </div>

</footer>
      
    </>
    </motion.div>
  );
}

export default Contact;