import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { mockApi } from "../../services/mockApi";
import { useToast } from "../../components/Toast";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { CreditCard, Lock } from "lucide-react";

export default function CheckoutPage() {
  const {
    cartItems,
    getSubtotal,
    getItemDiscountTotal,
    getCouponDiscount,
    getDiscountTotal,
    getTotal,
    coupon,
    clearCart,
  } = useCart();
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Only check cart once on initial mount
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, []); // No dependencies - runs once on mount

  const getItemPrice = (item) => {
    if (!item.discount?.active) return item.price;
    if (item.discount.type === "percentage")
      return item.price - (item.price * item.discount.value) / 100;
    return Math.max(0, item.price - item.discount.value);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!cardName.trim()) {
      setError("Card name is required");
      return;
    }
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const items = cartItems.map((item) => ({
        skillId: item.id,
        titleSnapshot: item.title,
        pricePaid: getItemPrice(item),
      }));

      const order = await mockApi.createOrder({
        buyerId: currentUser.id,
        items,
        subtotal: getSubtotal(),
        discountTotal: getDiscountTotal(),
        total: getTotal(),
        couponCode: coupon?.code || null,
      });

      clearCart();
      navigate(`/orders/${order.id}/success`, { state: { order } });
    } catch (err) {
      addToast("Order failed. Please try again.", "error");
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
        <div className="flex items-center gap-2 mb-8">
          <Lock className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 font-medium">
            Simulated Payment — No real money involved
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Order Review */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Order Review</h2>
              <div className="space-y-3">
                {cartItems.map((item) => {
                  const price = getItemPrice(item);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400">{item.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{getSubtotal().toFixed(2)}</span>
                </div>
                {getItemDiscountTotal() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Item Discounts</span>
                    <span>- ₹{getItemDiscountTotal().toFixed(2)}</span>
                  </div>
                )}
                {getCouponDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>- ₹{getCouponDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Mock Payment Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <h2 className="font-semibold text-gray-900">
                  Mock Payment Details
                </h2>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-5">
                <p className="text-yellow-700 text-xs">
                  ⚠️ This is a <strong>simulated payment</strong>. No real
                  transactions will occur.
                </p>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <Input
                  label="Cardholder Name"
                  placeholder="Name on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  error={error}
                />
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Card Number
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                    value="•••• •••• •••• 4242"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Expiry
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                      value="12/28"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      CVC
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                      value="•••"
                      readOnly
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full !py-3 !text-base"
                >
                  {loading
                    ? "Processing..."
                    : `Pay Now (Simulated) — ₹${getTotal().toFixed(2)}`}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-3">Summary</h2>
              <p className="text-3xl font-bold text-gray-900">
                ₹{getTotal().toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {cartItems.length} skill(s)
              </p>
              <div className="mt-4 text-xs text-gray-400 space-y-1">
                <p>✓ Instant access after payment</p>
                <p>✓ No real money charged</p>
                <p>✓ Simulated order flow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
