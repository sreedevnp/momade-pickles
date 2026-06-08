import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-lg w-full p-10 rounded-3xl shadow-xl text-center">

        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-4xl font-bold text-green-600">
          Order Placed Successfully
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for choosing Momade Homemade Pickles.
        </p>

        <div className="mt-6 bg-gray-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="font-bold text-lg">
            {orderId}
          </p>
        </div>

        <div className="mt-6 text-left bg-green-50 p-4 rounded-xl">
          <p>
            📧 Our team has received your order details.
          </p>

          <p className="mt-2">
            📞 We will contact you shortly if needed.
          </p>

          <p className="mt-2">
            🚚 Your order is now being processed.
          </p>
        </div>

        <p className="mt-6 text-gray-500">
          Redirecting to homepage in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}

export default Success;