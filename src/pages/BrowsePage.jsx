import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { SkillCard } from "../components/SkillCard";
import { SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  "Writing",
  "Coding",
  "Data",
  "Marketing",
  "Productivity",
  "Design",
  "Business",
  "Education",
];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "priceAsc", label: "Price: Low → High" },
  { value: "priceDesc", label: "Price: High → Low" },
  { value: "ratingDesc", label: "Highest Rated" },
  { value: "biggestDiscount", label: "Biggest Discount" },
];

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category") ? [searchParams.get("category")] : []
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [onOfferOnly, setOnOfferOnly] = useState(
    searchParams.get("onOffer") === "true"
  );
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const filters = {
        category:
          selectedCategories.length === 1 ? selectedCategories[0] : undefined,
        search,
        onOfferOnly,
        sort,
        minPrice,
        maxPrice,
      };
      let result = await mockApi.getSkills(filters);
      if (selectedCategories.length > 1) {
        result = result.filter((s) => selectedCategories.includes(s.category));
      }
      // Client-side safety nets
      if (onOfferOnly) {
        result = result.filter((s) => s.discount && s.discount.active === true);
      }
      if (minRating !== "") {
        result = result.filter((s) => (s.rating || 0) >= Number(minRating));
      }
      setSkills(result);
      setCurrentPage(1); // Reset to page 1 when filters change
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Calculate visible skills
  const visibleSkills = skills.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = visibleSkills.length < skills.length;

  useEffect(() => {
    fetchSkills();
  }, [
    selectedCategories,
    search,
    onOfferOnly,
    sort,
    minPrice,
    maxPrice,
    minRating,
  ]);

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    const offer = searchParams.get("onOffer");
    if (cat) setSelectedCategories([cat]);
    if (q) setSearch(q);
    if (offer === "true") setOnOfferOnly(true);
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    onOfferOnly ||
    minPrice !== "" ||
    maxPrice !== "" ||
    minRating !== "";

  const clearAll = () => {
    setSelectedCategories([]);
    setOnOfferOnly(false);
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-orange-500 transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 my-4" />

              {/* Price Range */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Price Range (₹)
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <span className="text-gray-400 text-sm shrink-0">to</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                {minPrice !== "" &&
                  maxPrice !== "" &&
                  Number(minPrice) > Number(maxPrice) && (
                    <p className="text-xs text-red-500 mt-1">
                      Min must be ≤ Max
                    </p>
                  )}
              </div>

              <div className="border-t border-gray-100 my-4" />

              {/* On Offer Only */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Deals
                </h3>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onOfferOnly}
                    onChange={() => setOnOfferOnly(!onOfferOnly)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
                    On Offer Only
                  </span>
                </label>
              </div>

              <div className="border-t border-gray-100 my-4" />

              {/* Minimum Rating */}
              <div className="mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Minimum Rating
                </h3>
                <div className="space-y-1.5">
                  {["", "4.5", "4.0", "3.5"].map((val) => (
                    <label
                      key={val}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="minRating"
                        checked={minRating === val}
                        onChange={() => setMinRating(val)}
                        className="text-orange-500 focus:ring-orange-400"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-orange-500 transition-colors">
                        {val === "" ? "Any rating" : `${val}★ & up`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Topbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 w-full max-w-xs"
                />
                <span className="text-sm text-gray-500 shrink-0">
                  {skills.length} results
                </span>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              </div>
            ) : skills.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg mb-2">No skills found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your filters or search term.
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleSkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
