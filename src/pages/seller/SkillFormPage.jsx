import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockApi, CATEGORIES } from "../../services/mockApi";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../components/Toast";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { PlusCircle, X } from "lucide-react";

const defaultForm = {
  title: "",
  tagline: "",
  description: "",
  category: "Coding",
  price: "",
  image: "",
  features: [""],
  content: "",
  discount: {
    active: false,
    type: "percentage",
    value: "",
    label: "",
    startDate: "",
    endDate: "",
  },
};

export default function SkillFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchSkill = async () => {
        try {
          const skills = JSON.parse(localStorage.getItem("skills"));
          const skill = skills.find((s) => s.id === id);
          if (!skill || skill.sellerId !== currentUser.id) {
            addToast("Skill not found or unauthorized.", "error");
            navigate("/dashboard");
            return;
          }
          setForm({
            title: skill.title || "",
            tagline: skill.tagline || "",
            description: skill.description || "",
            category: skill.category || "Coding",
            price: skill.price || "",
            image: skill.image || "",
            features: skill.features?.length > 0 ? skill.features : [""],
            content: skill.content || "",
            discount: skill.discount || defaultForm.discount,
          });
        } catch (err) {
          console.error(err);
        }
        setFetchLoading(false);
      };
      fetchSkill();
    }
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim() || form.title.length < 3)
      errs.title = "Title must be at least 3 characters";
    if (form.title.length > 80)
      errs.title = "Title must be 80 characters or less";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.content.trim())
      errs.content = "Skill content / prompt is required";
    if (
      form.price === "" ||
      isNaN(Number(form.price)) ||
      Number(form.price) < 0
    )
      errs.price = "Price must be a non-negative number";

    // Validate discount if value is provided
    if (form.discount.value) {
      if (!form.discount.value)
        errs["discount.value"] = "Discount value is required";

      // Validate that discount doesn't exceed price
      if (Number(form.price) > 0) {
        if (form.discount.type === "percentage") {
          const maxPercentage = 99;
          if (Number(form.discount.value) >= maxPercentage) {
            errs["discount.value"] =
              "Percentage discount must be less than 100%";
          }
        } else if (form.discount.type === "flat") {
          if (Number(form.discount.value) >= Number(form.price)) {
            errs["discount.value"] =
              "Flat discount must be less than the skill price";
          }
        }
      }

      // Validate start and end dates
      if (form.discount.startDate && form.discount.endDate) {
        if (
          new Date(form.discount.endDate) <= new Date(form.discount.startDate)
        ) {
          errs["discount.endDate"] = "End date must be after start date";
        }
      }
    }

    return errs;
  };

  const handleFeatureChange = (i, val) => {
    const updated = [...form.features];
    updated[i] = val;
    setForm({ ...form, features: updated });
  };

  const addFeature = () =>
    setForm({ ...form, features: [...form.features, ""] });
  const removeFeature = (i) =>
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);

    const skillData = {
      ...form,
      price: Number(form.price),
      features: form.features.filter((f) => f.trim()),
      sellerId: currentUser.id,
      discount: {
        ...form.discount,
        value: Number(form.discount.value) || 0,
      },
    };

    try {
      if (isEdit) {
        await mockApi.updateSkill(id, skillData, currentUser.id);
        addToast("Skill updated successfully!", "success");
      } else {
        await mockApi.createSkill(skillData);
        addToast("Skill created successfully!", "success");
      }
      navigate("/dashboard");
    } catch (err) {
      addToast(err.message || "Something went wrong.", "error");
    }
    setLoading(false);
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {isEdit ? "Edit Skill" : "Create New Skill"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Basic Information</h2>
            <Input
              label="Title *"
              placeholder="e.g., Expert React Component Generator"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={errors.title}
            />
            <Input
              label="Short Tagline (optional)"
              placeholder="One-line summary"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Description *
              </label>
              <textarea
                rows={4}
                placeholder="Describe what this skill does and how to use it..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y ${errors.description ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Price (₹) *"
                type="number"
                min="0"
                step="0.01"
                placeholder="15.00"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                error={errors.price}
              />
            </div>
            <Input
              label="Cover Image URL (optional)"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
              What's Included (optional bullet points)
            </h2>
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Feature ${i + 1}`}
                    value={f}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600"
            >
              <PlusCircle className="w-4 h-4" /> Add feature
            </button>
          </div>

          {/* Skill Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-1">
              Skill Content / Prompt *
            </h2>
            <p className="text-xs text-gray-400 mb-3">
              This is what buyers receive after purchase. Write the full Claude
              prompt or instructions here.
            </p>
            <textarea
              rows={8}
              placeholder="Act as an expert in... [Detailed Claude prompt here]"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className={`w-full border rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y ${errors.content ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.content && (
              <span className="text-xs text-red-500">{errors.content}</span>
            )}
          </div>

          {/* Discount */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Offer / Discount</h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-600">Active</span>
                <input
                  type="checkbox"
                  checked={form.discount.active}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount: { ...form.discount, active: e.target.checked },
                    })
                  }
                  className="rounded border-gray-300 text-orange-500"
                />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Discount Type
                </label>
                <select
                  value={form.discount.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount: { ...form.discount, type: e.target.value },
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>
              <Input
                label={`Value (${form.discount.type === "percentage" ? "%" : "₹"})`}
                type="number"
                min="0"
                placeholder={form.discount.type === "percentage" ? "20" : "50"}
                value={form.discount.value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discount: { ...form.discount, value: e.target.value },
                  })
                }
                error={errors["discount.value"]}
              />
              <Input
                label="Offer Label (optional)"
                placeholder="Launch Offer"
                value={form.discount.label}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discount: { ...form.discount, label: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Start Date (optional)
                </label>
                <input
                  type="datetime-local"
                  value={form.discount.startDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount: { ...form.discount, startDate: e.target.value },
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  End Date (optional)
                </label>
                <input
                  type="datetime-local"
                  value={form.discount.endDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount: { ...form.discount, endDate: e.target.value },
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors["discount.endDate"] && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors["discount.endDate"]}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1 !py-3">
              {loading
                ? "Saving..."
                : isEdit
                  ? "Update Skill"
                  : "Publish Skill"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
              className="flex-1 !py-3"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
