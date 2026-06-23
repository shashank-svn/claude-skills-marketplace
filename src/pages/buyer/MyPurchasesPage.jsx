import { useState, useEffect } from "react";
import { mockApi } from "../../services/mockApi";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../components/Toast";
import { Button } from "../../components/Button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function MyPurchasesPage() {
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const myOrders = await mockApi.getMyOrders(currentUser.id);
        setOrders(myOrders);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [currentUser]);

  const handleViewSkill = async (skillId) => {
    try {
      const content = await mockApi.getSkillContent(skillId, currentUser.id);
      setModalContent(content);
    } catch (err) {
      addToast("Could not load skill content.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {modalContent && (
        <ContentModal
          content={modalContent}
          onClose={() => setModalContent(null)}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Purchases</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-16 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-gray-600 mb-2">
              No purchases yet
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Browse the marketplace to find your first skill.
            </p>
            <Link to="/skills">
              <Button>Browse Skills</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <p className="text-xs text-gray-400 font-mono mb-1">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium capitalize">
                      {order.status}
                    </span>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="px-6 py-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.titleSnapshot}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{item.pricePaid.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleViewSkill(item.skillId)}
                        className="text-sm shrink-0"
                      >
                        View Skill
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
