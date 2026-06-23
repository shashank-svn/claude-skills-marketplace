import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "../../components/Button";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No order information found.</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 mb-1 text-sm">
          Your simulated purchase was successful.
        </p>
        <p className="text-xs text-gray-400 mb-6 font-mono">
          Order #{order.id}
        </p>

        <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Purchased Skills
          </h2>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.titleSnapshot}</span>
                <span className="font-medium text-gray-900">
                  ₹{item.pricePaid.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-sm font-bold">
            <span>Total Paid</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/my-purchases" className="flex-1">
            <Button className="w-full">View My Purchases</Button>
          </Link>
          <Link to="/skills" className="flex-1">
            <Button variant="secondary" className="w-full">
              Continue Browsing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
