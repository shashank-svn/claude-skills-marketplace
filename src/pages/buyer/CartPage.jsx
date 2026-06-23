import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../components/Toast";
import { Button } from "../../components/Button";
import { Trash2, ShoppingBag, Tag, Store } from "lucide-react";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    getSubtotal,
    getItemDiscountTotal,
    getCouponDiscount,
    getTotal,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      await applyCoupon(couponCode.trim());
      addToast("Coupon applied!", "success");
    } catch (err) {
      setCouponError(err.message || "Invalid coupon code");
    }
    setCouponLoading(false);
  };

  const getItemPrice = (item) => {
    if (!item.discount?.active) return item.price;
    if (item.discount.type === "percentage")
      return item.price - (item.price * item.discount.value) / 100;
    return Math.max(0, item.price - item.discount.value);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-6">
            Browse our skills and add some to your cart.
          </p>
          <Link to="/skills">
            <Button>Browse Skills</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const itemPrice = getItemPrice(item);
              const hasDiscount =
                item.discount?.active && itemPrice < item.price;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>Category: {item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4" />
                        <span>Seller: {item.sellerName}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      {hasDiscount ? (
                        <>
                          <span className="text-gray-400 text-sm line-through">
                            ₹{item.price.toFixed(2)}
                          </span>
                          <span className="font-bold text-gray-900">
                            ₹{itemPrice.toFixed(2)}
                          </span>
                          <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                            {item.discount.label || "OFFER"}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-gray-900">
                          ₹{item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors shrink-0 mt-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-5">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="mb-5">
                <label className="block text-sm text-gray-600 mb-2">
                  Coupon Code
                </label>
                {coupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <span className="text-sm text-green-700 font-medium">
                      {coupon.code} applied ✓
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="WELCOME10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading}
                        variant="outline"
                        className="text-sm !px-3 !py-2"
                      >
                        {couponLoading ? "..." : "Apply"}
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-xs text-red-500 mt-1">{couponError}</p>
                    )}
                  </>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mb-4">
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

              <Button onClick={() => navigate("/checkout")} className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
