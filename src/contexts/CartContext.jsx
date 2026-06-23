import { createContext, useContext, useState, useEffect } from "react";
import { mockApi, isDiscountActive } from "../services/mockApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    // Load cart from local storage for current session
    // Note: Cart shouldn't persist across different users, but for simplicity we keep it simple
    // A better approach clears it on logout.
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (skill) => {
    if (cartItems.find((item) => item.id === skill.id)) return; // Prevent duplicate
    setCartItems([...cartItems, skill]);
  };

  const removeFromCart = (skillId) => {
    setCartItems(cartItems.filter((item) => item.id !== skillId));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const applyCoupon = async (code) => {
    const validCoupon = await mockApi.validateCoupon(code);
    setCoupon(validCoupon);
  };

  const removeCoupon = () => setCoupon(null);

  // Calculations
  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + Number(item.price), 0);
  };

  const getItemDiscountTotal = () => {
    let discount = 0;
    cartItems.forEach((item) => {
      if (isDiscountActive(item.discount)) {
        let itemDiscount;
        if (item.discount.type === "percentage") {
          itemDiscount = item.price * (item.discount.value / 100);
        } else if (item.discount.type === "flat") {
          itemDiscount = item.discount.value;
        }
        // Ensure discount doesn't exceed item price (leave at least 0.01)
        discount += Math.min(itemDiscount, item.price - 0.01);
      }
    });
    return discount;
  };

  const getCouponDiscount = () => {
    if (!coupon) return 0;

    const itemDiscounts = getItemDiscountTotal();
    const currentTotal = getSubtotal() - itemDiscounts;

    if (coupon.type === "percentage") {
      return currentTotal * (coupon.value / 100);
    } else if (coupon.type === "flat") {
      return coupon.value;
    }
    return 0;
  };

  const getDiscountTotal = () => {
    return getItemDiscountTotal() + getCouponDiscount();
  };

  const getTotal = () => {
    return Math.max(0, getSubtotal() - getDiscountTotal());
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        getSubtotal,
        getItemDiscountTotal,
        getCouponDiscount,
        getDiscountTotal,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
