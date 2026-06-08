import { useCart } from "./context/CartContext";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

function Cart() {
  const {
  cart,
  increaseQuantity,
  decreaseQuantity,
} = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // scrolling down
    } else {
      setShowNavbar(true); // scrolling up
    }

    lastScrollY = window.scrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price.replace("₹", "")) * item.quantity,
    0
  );
  

  return (
    <>
      {/* Navbar */}
      <nav
  className={`
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
  `}
>
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-3 flex items-center justify-between">

          <img src={logo} alt="Momade"
            className="h-12 md:h-20 w-auto"/>

          <div className="hidden md:flex gap-10 text-white text-lg">

            <Link
              to="/"
              className="hover:text-[#D4A017] transition"
            >
              Home
            </Link>

            <Link
              to="/#products"
              className="hover:text-[#D4A017] transition"
            >
              Products
            </Link>

            <Link
              to="/contact"
              className="hover:text-[#D4A017] transition"
            >
              Contact
            </Link>

            <Link
              to="/cart"
              className="text-[#D4A017] border-b-2 border-[#D4A017] pb-1"
            >
              Cart
            </Link>

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
              shadow-lg">
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
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 text-white border-b border-white/10 hover:text-[#D4A017]">
            Home
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 text-white border-b border-white/10 hover:text-[#D4A017]">
            Contact
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 text-[#D4A017]">
            Cart
          </Link>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-[#F8F4EE] via-[#F6F0E8] to-[#EFE5D8] pt-36 px-6 pb-20">

        <h1
          className="text-5xl md:text-6xl text-[#8B1E3F] text-center mb-12"
          style={{ fontFamily: "Cormorant Garamond" }}>
          Shopping Cart
        </h1>

        <div className="max-w-5xl mx-auto">

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl text-[#8B1E3F] mb-4">
                Your Cart is Empty
              </h2>

              <p className="text-gray-600">
                Add some delicious homemade pickles to continue.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6">

                {cart.map((item, index) => (
                  <div
                    key={index}
                   className="bg-white/60 backdrop-blur-xl
                  border
                  border-white/40 rounded-3xl
                  shadow-2xl
                  p-6
                  flex justify-between items-center transition-all
                  duration-300
                  hover:scale-[1.01]">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#8B1E3F]">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Authentic Kerala Homemade Pickle
                      </p>

                      <div className="flex items-center gap-3 mt-3">

                      <button onClick={() => decreaseQuantity(item.name)}
                        className="w-8
                        h-8
                        rounded-full
                        bg-white/70
                        backdrop-blur-md
                        border border-gray-200
                        hover:scale-110
                        transition">
                        -
                      </button>

                      <span className="font-semibold text-lg">
                        {item.quantity}
                      </span>

                      <button onClick={() => increaseQuantity(item.name)}
                        className="w-8 h-8
                        rounded-full
                        bg-[#D4A017]
                        text-white
                        shadow-lg
                        hover:shadow-xl hover:scale-110
                        transition">
                        +
                      </button>
                    </div>
                  </div>

                    <div className="text-right">

                  <div className="text-2xl font-bold text-[#D4A017]">
                    ₹{Number(item.price.replace("₹", "")) * item.quantity}
                  </div>

                  <p className="text-sm text-gray-500">
                    {item.price} each
                  </p>

                </div>
                  </div>
                ))}

              </div>

              <div className="mt-8
                bg-white/60
                backdrop-blur-xl
                border
                border-white/40
                rounded-3xl
                shadow-2xl
                p-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-[#8B1E3F]">
                    Total
                  </h2>

                  <span className="text-4xl font-bold text-[#D4A017]">
                    ₹{total}
                  </span>
                </div>
                <Link to="/checkout">
                  <button className="
                    w-full
                    mt-6
                    bg-gradient-to-r
                    from-[#8B1E3F]
                    to-[#A3264C]
                    text-white
                    py-4
                    rounded-full
                    text-lg
                    font-semibold
                    shadow-xl
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:shadow-[0_0_25px_rgba(139,30,63,0.35)]
                    hover:from-[#A3264C]
                    hover:to-[#C0395A]
                    active:scale-[0.98]">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>

            </>
            
          )}

        </div>

      </div>
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

      <div>
        <h3 className="text-2xl text-[#D4A017] font-semibold mb-4">
          Quick Links
        </h3>

        <div className="space-y-3">
          <Link
            to="/"
            className="block text-white/80 hover:text-[#D4A017] transition">
            Home
          </Link>

          <Link
            to="/contact"
            className="block text-white/80 hover:text-[#D4A017] transition">
            Contact
          </Link>

          <Link
            to="/cart"
            className="block text-[#D4A017]">
            Cart
          </Link>
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
    
  );
}

export default Cart;