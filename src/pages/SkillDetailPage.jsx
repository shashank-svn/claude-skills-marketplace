import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockApi, isDiscountActive } from "../services/mockApi";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../components/Toast";
import { SkillCard } from "../components/SkillCard";
import { Button } from "../components/Button";
import { Star, Tag, CheckCircle, Store } from "lucide-react";

function ContentModal({ content, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Skill Content / Prompt
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg border">
            {content}
          </pre>
        </div>
        <div className="p-5 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SkillDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addToCart, cartItems } = useCart();
  const { addToast } = useToast();

  const [skill, setSkill] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const [skillContent, setSkillContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  const isInCart = skill && cartItems.some((i) => i.id === skill.id);

  useEffect(() => {
    const fetchSkill = async () => {
      setLoading(true);
      try {
        const s = await mockApi.getSkillById(id);
        setSkill(s);

        const allSkills = await mockApi.getSkills({ category: s.category });
        setRelated(allSkills.filter((sk) => sk.id !== id).slice(0, 4));

        if (currentUser) {
          const orders = await mockApi.getMyOrders(currentUser.id);
          const purchased = orders.some((o) =>
            o.items.some((item) => item.skillId === id)
          );
          setAlreadyPurchased(purchased || s.sellerId === currentUser.id);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchSkill();
  }, [id, currentUser]);

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: { pathname: `/skills/${id}` } } });
      return;
    }
    addToCart(skill);
    addToast(
      `"${skill.title}" ${isInCart ? "already in cart!" : "added to cart!"}`,
      "success"
    );
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: { pathname: `/skills/${id}` } } });
      return;
    }
    if (!isInCart) addToCart(skill);
    navigate("/checkout");
  };

  const handleViewSkill = async () => {
    setContentLoading(true);
    try {
      const content = await mockApi.getSkillContent(id, currentUser.id);
      setSkillContent(content);
      setShowModal(true);
    } catch (err) {
      addToast("Could not load skill content.", "error");
    }
    setContentLoading(false);
  };

  const getDiscountedPrice = () => {
    if (!isDiscountActive(skill?.discount)) return skill?.price;
    let discountedPrice;
    if (skill.discount.type === "percentage") {
      discountedPrice =
        skill.price - (skill.price * skill.discount.value) / 100;
    } else {
      discountedPrice = skill.price - skill.discount.value;
    }
    return Math.max(0.01, discountedPrice);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Skill not found.</p>
      </div>
    );
  }

  const discountedPrice = getDiscountedPrice();
  const hasDiscount =
    isDiscountActive(skill.discount) && discountedPrice < skill.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {showModal && (
        <ContentModal
          content={skillContent}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left - Main Detail */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-6">
              {skill.image ? (
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  {skill.category}
                </span>
                {hasDiscount && (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.discount.label ||
                      (skill.discount.type === "percentage"
                        ? `${skill.discount.value}% OFF`
                        : `₹${skill.discount.value} OFF`)}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {skill.title}
              </h1>
              {skill.tagline && (
                <p className="text-gray-500 text-lg">{skill.tagline}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  {skill.rating || 0}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-3 text-lg">
                About this Skill
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Features */}
            {skill.features && skill.features.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="font-semibold text-gray-900 mb-3 text-lg">
                  What's Included
                </h2>
                <ul className="space-y-2">
                  {skill.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right - Action Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              {/* Price */}
              <div className="mb-5">
                {hasDiscount ? (
                  <>
                    <span className="text-gray-400 line-through text-lg">
                      ₹{skill.price.toFixed(2)}
                    </span>
                    <div className="text-3xl font-bold text-gray-900 mt-1">
                      ₹{discountedPrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-green-600 font-medium mt-1">
                      You save ₹{(skill.price - discountedPrice).toFixed(2)}
                    </div>
                  </>
                ) : (
                  <div className="text-3xl font-bold text-gray-900">
                    ₹{skill.price.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Buttons */}
              {alreadyPurchased ? (
                <Button
                  onClick={handleViewSkill}
                  disabled={contentLoading}
                  className="w-full mb-3"
                >
                  {contentLoading ? "Loading..." : "View Skill"}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleAddToCart}
                    variant={isInCart ? "secondary" : "primary"}
                    className="w-full mb-3"
                  >
                    {isInCart ? "Already in Cart" : "Add to Cart"}
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    variant="secondary"
                    className="w-full"
                  >
                    Buy Now
                  </Button>
                </>
              )}

              <div className="mt-5 pt-5 border-t border-gray-100 text-sm text-gray-500">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4" />
                  <span>Category: {skill.category}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Store className="w-4 h-4" />
                  <span>Seller: {skill.sellerName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Skills */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Related Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((s) => (
                <SkillCard key={s.id} skill={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
