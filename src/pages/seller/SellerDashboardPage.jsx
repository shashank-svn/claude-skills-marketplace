import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockApi } from "../../services/mockApi";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../components/Toast";
import { Button } from "../../components/Button";
import {
  PlusCircle,
  Edit,
  Trash2,
  Tag,
  DollarSign,
  BarChart2,
} from "lucide-react";

export default function SellerDashboardPage() {
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "flat",
    value: "",
  });
  const [couponError, setCouponError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'skill' | 'coupon', id: string }

  const fetchData = async () => {
    try {
      const [s, c] = await Promise.all([
        mockApi.getSellerSummary(currentUser.id),
        mockApi.getCoupons(currentUser.id),
      ]);
      setSummary(s);
      setCoupons(c);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    try {
      if (deleteConfirm.type === "skill") {
        await mockApi.deleteSkill(deleteConfirm.id, currentUser.id);
        addToast("Skill deleted successfully.", "success");
      } else {
        await mockApi.deleteCoupon(deleteConfirm.id, currentUser.id);
        addToast("Coupon deleted.", "success");
      }
      fetchData();
    } catch (err) {
      addToast("Could not delete item.", "error");
    }
    setDeleteConfirm(null);
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    setCouponError("");
    if (!newCoupon.code.trim() || !newCoupon.value) {
      setCouponError("Code and value are required");
      return;
    }
    try {
      await mockApi.createCoupon({
        ...newCoupon,
        value: Number(newCoupon.value),
        sellerId: currentUser.id,
      });
      addToast("Coupon created!", "success");
      setNewCoupon({ code: "", type: "flat", value: "" });
      fetchData();
    } catch (err) {
      addToast("Could not create coupon.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const skills = summary?.skills || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">
              Delete {deleteConfirm.type === "skill" ? "Skill" : "Coupon"}?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <Link to="/dashboard/skills/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Add New Skill
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Total Listings",
              value: summary?.totalListings || 0,
              icon: <BarChart2 className="w-6 h-6 text-orange-500" />,
            },
            {
              label: "Total Sales",
              value: summary?.salesCount || 0,
              icon: <Tag className="w-6 h-6 text-green-500" />,
            },
            {
              label: "Revenue (Simulated)",
              value: `₹${(summary?.revenue || 0).toFixed(2)}`,
              icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4"
            >
              <div className="p-3 bg-gray-50 rounded-lg">{card.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">My Listings</h2>
          </div>
          {skills.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <p>No skills listed yet.</p>
              <Link
                to="/dashboard/skills/new"
                className="text-orange-500 hover:text-orange-600 hover:underline text-sm mt-2 inline-block"
              >
                Create your first skill →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Title
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Discount
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {skills.map((skill) => (
                    <tr key={skill.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                        {skill.title}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {skill.category}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        ₹{skill.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {skill.discount?.active ? (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            {skill.discount.type === "percentage"
                              ? `${skill.discount.value}%`
                              : `₹${skill.discount.value}`}{" "}
                            off
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(`/dashboard/skills/${skill.id}/edit`)
                            }
                            className="text-orange-500 hover:text-orange-600 p-1 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirm({ type: "skill", id: skill.id })
                            }
                            className="text-red-500 hover:text-red-600 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Coupons */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Coupon Codes</h2>
          </div>
          <div className="p-6">
            {/* Create Coupon */}
            <form
              onSubmit={handleAddCoupon}
              className="flex flex-wrap gap-3 mb-6"
            >
              <input
                type="text"
                placeholder="CODE"
                value={newCoupon.code}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    code: e.target.value.toUpperCase(),
                  })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-32"
              />
              <select
                value={newCoupon.type}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, type: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="flat">Flat (₹)</option>
                <option value="percentage">Percentage (%)</option>
              </select>
              <input
                type="number"
                placeholder="Value"
                value={newCoupon.value}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, value: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-24"
              />
              <Button type="submit" variant="secondary">
                Create Coupon
              </Button>
              {couponError && (
                <p className="text-xs text-red-500 w-full">{couponError}</p>
              )}
            </form>

            {coupons.length === 0 ? (
              <p className="text-gray-400 text-sm">No coupons yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border border-gray-200 rounded-lg">
                    <tr>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                        Code
                      </th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                        Value
                      </th>
                      <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {coupons.map((c) => (
                      <tr key={c.id}>
                        <td className="px-4 py-3 font-mono font-semibold text-gray-900">
                          {c.code}
                        </td>
                        <td className="px-4 py-3 text-gray-500 capitalize">
                          {c.type}
                        </td>
                        <td className="px-4 py-3 text-gray-900">
                          {c.type === "flat" ? `₹${c.value}` : `${c.value}%`}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() =>
                              setDeleteConfirm({ type: "coupon", id: c.id })
                            }
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
