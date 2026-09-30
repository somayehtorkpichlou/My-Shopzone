import { useContext, useEffect, useMemo, useState } from "react";
import Title from "../components/Title";
import CartTotal from "./../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import zarrinpal_icon from "../assets/zarrinpal_icon.svg";
import mellat_icon from "../assets/mellat_icon.svg";
import saman_icon from "../assets/saman_icon.svg";

const PlaceOrder = () => {
  const [method, setMethod] = useState("zarinpal");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const hasCartItems = useMemo(() => {
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          return true;
        }
      }
    }
    return false;
  }, [cartItems]);

  useEffect(() => {
    if (!hasCartItems && !orderCompleted) {
      toast.info("Your cart is empty.");
      navigate("/cart");
    }
  }, [hasCartItems, navigate, orderCompleted]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const paymentMethods = [
    { id: "zarinpal", name: "Zarrinpal", gateway: "zarinpal", icon: zarrinpal_icon },
    { id: "mellat", name: "Bank Mellat", gateway: "mellat", icon: mellat_icon },
    { id: "saman", name: "Saman Bank", gateway: "saman", icon: saman_icon },
  ];

  const createPaymentCode = () => {
    return `IR-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!hasCartItems) {
      toast.info("Your cart is empty.");
      navigate("/cart");
      return;
    }

    setIsProcessing(true);

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const referenceCode = createPaymentCode();
      const selectedPayment = paymentMethods.find((item) => item.id === method);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: selectedPayment?.name || method,
        paymentGateway: selectedPayment?.gateway || method,
        paymentCode: referenceCode,
        gatewayReference: referenceCode,
        gatewayStatus: "pending",
        gatewayResponse: {
          provider: selectedPayment?.name || method,
          localReferenceCode: referenceCode,
        },
      };

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        { headers: { token } },
      );

      if (response.data.success) {
        setOrderCompleted(true);
        toast.success("Order saved successfully!");
        navigate("/payment-success", {
          state: {
            orderId: response.data.orderId,
            paymentCode: response.data.paymentCode || referenceCode,
            paymentMethod: selectedPayment?.name || method,
          },
        });
        setCartItems({});
      } else {
        toast.error(response.data.message || "Order failed.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ---------Left Side----------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* ----------Right Side----------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ------Payment Method Selection-------- */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {paymentMethods.map((item) => {

              return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMethod(item.id)}
                className={`flex items-center justify-center border p-3 transition-all ${
                  method === item.id
                    ? "border-black bg-[#fff7f5]"
                    : "border-gray-300 hover:border-gray-500"
                }`}
                aria-pressed={method === item.id}
              >
                <span className="flex h-10 items-center gap-2 text-sm font-medium text-gray-700">
                  <img src={item.icon} alt="" className="h-[34px] w-[34px]" />
                  {item.name}
                </span>
              </button>
              );
            })}
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-black text-white px-16 py-3 text-sm disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isProcessing ? "PROCESSING..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
