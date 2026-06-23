import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockApi, CATEGORIES } from "../services/mockApi";
import { SkillCard } from "../components/SkillCard";
import { Button } from "../components/Button";
import { ArrowRight, ShoppingBag, Zap, Star } from "lucide-react";

const CATEGORY_COLORS = {
  Writing: "bg-purple-100 text-purple-700",
  Coding: "bg-blue-100 text-blue-700",
  Data: "bg-green-100 text-green-700",
  Marketing: "bg-orange-100 text-orange-700",
  Productivity: "bg-yellow-100 text-yellow-700",
  Design: "bg-pink-100 text-pink-700",
  Business: "bg-teal-100 text-teal-700",
  Education: "bg-red-100 text-red-700",
};

export default function HomePage() {
  const [featuredSkills, setFeaturedSkills] = useState([]);
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await mockApi.getSkills({ sort: "newest" });
        setFeaturedSkills(all.slice(0, 8));
        const offers = await mockApi.getSkills({ onOfferOnly: true });
        setOfferedSkills(offers);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Discover & Use Powerful
            <br />
            Claude AI Skills
          </h1>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Browse a curated marketplace of reusable Claude AI capability
            packages. Find the perfect skill for writing, coding, marketing, and
            more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/skills")}
              className="!bg-white !text-orange-600 hover:!bg-orange-50 !font-semibold !px-8 !py-3 !text-base"
            >
              Browse Skills
            </Button>
            {/* <Button
              onClick={() => navigate("/signup")}
              variant="outline"
              className="!border-white !text-white hover:!bg-white/10 !font-semibold !px-8 !py-3 !text-base"
            >
              Become a Seller
            </Button> */}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: (
                  <ShoppingBag className="w-8 h-8 text-orange-500 mx-auto" />
                ),
                title: "1. Browse",
                desc: "Explore hundreds of curated Claude AI skills across 8 categories.",
              },
              {
                icon: <Zap className="w-8 h-8 text-pink-500 mx-auto" />,
                title: "2. Add to Cart",
                desc: "Pick the skills you need and apply discounts or coupon codes.",
              },
              {
                icon: <Star className="w-8 h-8 text-purple-600 mx-auto" />,
                title: "3. Get Your Skill",
                desc: "Complete checkout and instantly access the full skill prompt.",
              },
            ].map((step) => (
              <div key={step.title} className="p-4">
                <div className="mb-3">{step.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* On Offer */}
        {offeredSkills.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                🔥 On Offer / Deals
              </h2>
              <Link
                to="/skills?onOffer=true"
                className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {loading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {offeredSkills.slice(0, 4).map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Featured Skills */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              ⭐ Featured Skills
            </h2>
            <Link
              to="/skills"
              className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
            >
              Browse all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
            </div>
          ) : featuredSkills.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
              <p className="text-gray-400 mb-2">No skills listed yet.</p>
              <Link
                to="/signup"
                className="text-orange-500 hover:underline text-sm"
              >
                Be the first to publish a skill!
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/skills?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80 ${CATEGORY_COLORS[cat]}`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
