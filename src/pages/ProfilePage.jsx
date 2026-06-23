import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/Toast";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function ProfilePage() {
  const { currentUser, updateUser } = useAuth();
  const { addToast } = useToast();
  const [name, setName] = useState(currentUser?.name || "");
  const [isSeller, setIsSeller] = useState(currentUser?.role === "seller");
  const [loading, setLoading] = useState(false);

  // Track initial values to detect changes
  const initialName = currentUser?.name || "";
  const initialIsSeller = currentUser?.role === "seller";
  const hasChanges = name !== initialName || isSeller !== initialIsSeller;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({
        name,
        role: isSeller ? "seller" : "buyer",
      });
      addToast("Profile updated successfully!", "success");
    } catch (err) {
      addToast(err.message || "Failed to update profile", "error");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Profile Settings
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Email (cannot be changed)
              </label>
              <Input
                type="email"
                value={currentUser?.email}
                disabled
                className="bg-gray-50"
              />
            </div>

            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSeller}
                  onChange={(e) => setIsSeller(e.target.checked)}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable Seller Role
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                As a seller, you can create and manage skills and coupons.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !hasChanges}
              className="w-full"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
