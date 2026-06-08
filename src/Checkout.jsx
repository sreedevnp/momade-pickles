import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";
import logo from "./assets/logo.png";
import {
  Link,
} from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import razorpay from "./assets/razorpay.png";

function Checkout() {
  const { cart, clearCart } = useCart();
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

  const [form, setForm] = useState({
  name: "",
  phone: "",
  state: "",
  location: "",
  address: "",
  pincode: "",
});

  const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price.replace("₹", "")) *
        item.quantity,
    0
  );

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const shipping =
    form.state === "Kerala"
      ? totalQuantity * 40
      : totalQuantity * 80;

  const grandTotal = subtotal + shipping;
  const handlePayment = async () => {
  if (
    !form.name ||
    !form.phone ||
    !form.state ||
    !form.location ||
    !form.address ||
    !form.pincode
  ) {
    alert("Please fill all required fields");
    return;
  }

  if (form.phone.length !== 10) {
    alert("Enter a valid 10-digit phone number");
    return;
  }

  if (form.pincode.length !== 6) {
    alert("Enter a valid 6-digit pincode");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: grandTotal,
        }),
      }
    );

    const order = await response.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      name: "Momade Homemade Pickles",
      description: "Order Payment",

      prefill: {
        name: form.name,
        contact: form.phone,
      },

      theme: {
        color: "#8B1E3F",
      },

      handler: async function (response) {

  const orderId =
    "MOM-" +
    Date.now().toString().slice(-6);

  try {

    await fetch(
      "http://localhost:5000/send-order-email",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          orderId,

          customer: {
            name: form.name,
            phone: form.phone,
            state: form.state,
            location: form.location,
            address: form.address,
            pincode: form.pincode,
          },

          cart,

          total: grandTotal,

          paymentId:
            response.razorpay_payment_id,
        }),
      }
    );

    clearCart();

    window.location.href =
      `/success?orderId=${orderId}`;

  } catch (error) {
  console.error(error);

  alert(
    "Payment successful but email failed."
  );
}
},
};


    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error(error);
    alert("Payment Failed");
  }
};

  return (
    <>
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
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <img
          src={logo}
          alt="Momade"
          className="h-16 md:h-20 w-auto"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-white text-lg">

          <Link
            to="/"
            className="hover:text-[#D4A017]">
            Home
          </Link>

          <Link
            to="/contact"
            className="hover:text-[#D4A017]">
            Contact
          </Link>

          <Link
            to="/cart"
            className="hover:text-[#D4A017]">
            Cart
          </Link>

          <span className="text-[#D4A017] border-b-2 border-[#D4A017] pb-1">
            Checkout
          </span>

        </div>

        <div className="flex items-center gap-4">

          <Link
            to="/cart"
            className="
              md:hidden
              relative
              text-2xl
              text-[#D4A017]">
            🛒

            {cart.length > 0 && (
              <span
                className="
                  absolute-top-2-right-2
                  w-5
                  h-5
                  rounded-full
                  bg-[#D4A017]
                  text-black
                  text-xs
                  font-bold
                  flex
                  items-center
                  justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
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
              text-2xl">
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>

        </div>

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
          onClick={() =>
            setMenuOpen(false)
          }
          className="block px-6 py-4 text-white border-b border-white/10">
          Home
        </Link>

        <Link
          to="/contact"
          onClick={() =>
            setMenuOpen(false)
          }
          className="block px-6 py-4 text-white border-b border-white/10">
          Contact
        </Link>

        <Link
          to="/cart"
          onClick={() =>
            setMenuOpen(false)
          }
          className="block px-6 py-4 text-white">
          Cart
        </Link>
      </div>
    )}
    <div className="min-h-screen bg-[#F8F4EE] pt-40 pb-12 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-center mb-8">
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">

<div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-8">

  <h2 className="text-4xl font-semibold text-[#8B1E3F]">
    Payment Details
  </h2>

  <div className="w-14 h-1 bg-[#3395FF] rounded-full mt-4 mb-10"></div>

  <input
    type="text"
    placeholder="Full Name"
    className="
      w-full
      h-16
      px-5
      rounded-2xl
      border
      border-gray-200
      bg-[#FAFAFA]
      focus:outline-none
      focus:ring-2
      focus:ring-[#3395FF]
      transition
      mb-5"
    value={form.name}
    onChange={(e) =>
      setForm({
        ...form,
        name: e.target.value,
      })
    }
  />

  <input
    type="text"
    placeholder="Phone Number"
    className="
      w-full
      h-16
      px-5
      rounded-2xl
      border
      border-gray-200
      bg-[#FAFAFA]
      focus:outline-none
      focus:ring-2
      focus:ring-[#3395FF]
      transition
      mb-5"
    value={form.phone}
    onChange={(e) =>
      setForm({
        ...form,
        phone: e.target.value,
      })
    }
  />

  <div className="relative mb-5">
  <select
    value={form.state}
    onChange={(e) =>
      setForm({
        ...form,
        state: e.target.value,
      })
    }
    className="
      w-full
      h-16
      px-5
      rounded-2xl
      border
      border-gray-200
      bg-[#FAFAFA]
      appearance-none
      focus:outline-none
      focus:ring-2
      focus:ring-[#3395FF]">
    <option value="">
      Select State
    </option>

    {states.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>

  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
    ▼
  </span>
</div>

  <input
    type="text"
    placeholder="District / Location"
    className="
      w-full
      h-16
      px-5
      rounded-2xl
      border
      border-gray-200
      bg-[#FAFAFA]
      focus:outline-none
      focus:ring-2
      focus:ring-[#3395FF]
      transition
      mb-5"
    value={form.location}
    onChange={(e) =>
      setForm({
        ...form,
        location: e.target.value,
      })
    }
  />

  <textarea
    rows="4"
    placeholder="Delivery Address"
    className="
      w-full
      p-5
      rounded-2xl
      border
      border-gray-200
      bg-[#FAFAFA]
      focus:outline-none
      focus:ring-2
      focus:ring-[#3395FF]
      transition
      mb-5"
    value={form.address}
    onChange={(e) =>
      setForm({
        ...form,
        address: e.target.value,
      })
    }
  />

  <input
    type="text"
    placeholder="Pincode"
    className="
      w-full
      h-16
      px-5
      rounded-2xl
      border
      border-gray-200
      bg-[#FAFAFA]
      focus:outline-none
      focus:ring-2
      focus:ring-[#3395FF]
      transition"
    value={form.pincode}
    onChange={(e) =>
      setForm({
        ...form,
        pincode: e.target.value,
      })
    }
  />

</div>

         <div className="bg-white rounded-3xl shadow-xl p-8">

  <div className="mb-8 text-center">

    <img
  src={razorpay}
  alt="Razorpay Secure Payments"
  className="h-20 mx-auto mb-4"/>

    <h3 className="text-xl font-semibold text-[#8B1E3F]">
      100% Secure Payments
    </h3>

    <p className="text-gray-500 mt-2">
      UPI • Cards • Net Banking • Wallets
    </p>
    <div
  className="
    bg-blue-50
    border
    border-blue-100
    rounded-2xl
    p-4
    mt-4">
  <p className="text-blue-700 font-medium">
    🔒 Payments secured by Razorpay
  </p>

  <p className="text-sm text-blue-500 mt-1">
    UPI, Credit Cards, Debit Cards,
    Net Banking & Wallets
  </p>
</div>

  </div>

  <h2 className="text-3xl text-[#8B1E3F] mb-6">
    Order Summary
  </h2>

            <div className="space-y-4">

              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between"
                >
                  <span>
                    {item.name} 500gm × {item.quantity}
                  </span>

                  <span>
                    ₹
                    {Number(
                      item.price.replace("₹", "")
                    ) * item.quantity}
                  </span>
                </div>
              ))}

            </div>

            <hr className="my-6" />

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>

              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>

              <span>₹{shipping}</span>
            </div>

            <div className="text-sm text-gray-500 mb-6">
              Kerala: ₹40 per item <br />
              Outside Kerala: ₹80 per item
            </div>

            <hr className="mb-6" />

            <div className="flex justify-between text-2xl font-bold text-[#8B1E3F]">
              <span>Total</span>

              <span>
                ₹{grandTotal}
              </span>
            </div>

            <button
            onClick={handlePayment}
  className="
    w-full
    mt-8
    h-16
    rounded-2xl
    bg-gradient-to-r
    from-[#3395FF]
    to-[#0F6FFF]
    text-white
    text-xl
    font-semibold
    shadow-lg
    hover:scale-[1.02]
    hover:shadow-xl
    transition-all
    duration-300">
  Pay ₹{grandTotal}
</button>

          </div>

        </div>

      </div>

    </div>

<footer className="bg-black text-white py-8">
  <div className="text-center">
    © 2026 Momade Homemade Pickles
  </div>
</footer>

</>
);
}

export default Checkout;