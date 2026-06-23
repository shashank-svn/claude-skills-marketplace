import { Link } from "react-router-dom";
import { Star } from "lucide-react";

// Helper to check if a discount is currently active
const isDiscountActive = (discount) => {
  if (!discount || !discount.active) return false;

  const now = new Date();

  // Check start date if provided
  if (discount.startDate && new Date(discount.startDate) > now) {
    return false;
  }

  // Check end date if provided
  if (discount.endDate && new Date(discount.endDate) < now) {
    return false;
  }

  return true;
};

export const SkillCard = ({ skill }) => {
  const isDiscounted = isDiscountActive(skill.discount);

  let discountedPrice = skill.price;
  if (isDiscounted) {
    if (skill.discount.type === "percentage") {
      discountedPrice =
        skill.price - skill.price * (skill.discount.value / 100);
    } else {
      discountedPrice = skill.price - skill.discount.value;
    }
    // Ensure discounted price is always greater than 0
    discountedPrice = Math.max(0.01, discountedPrice);
  }

  return (
    <Link to={`/skills/${skill.id}`} className="group block h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Image Placeholder */}
        <div className="h-48 bg-gray-100 w-full relative overflow-hidden flex-shrink-0">
          {skill.image ? (
            <img
              src={skill.image}
              alt={skill.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">No Image</span>
            </div>
          )}
          {isDiscounted && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {skill.discount.label || "OFFER"}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
              {skill.title}
            </h3>
          </div>

          <div className="text-sm text-gray-500 mb-3 flex-grow">
            {skill.tagline || skill.description.substring(0, 60) + "..."}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                {skill.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold text-gray-600">
                  {skill.rating && skill.rating > 0
                    ? skill.rating.toFixed(1)
                    : "New"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              {isDiscounted ? (
                <>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{skill.price.toFixed(2)}
                  </span>
                  <span className="font-bold text-gray-900">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-gray-900">
                  ₹{skill.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
