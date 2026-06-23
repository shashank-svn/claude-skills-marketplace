import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./components/Toast";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import SkillDetailPage from "./pages/SkillDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProfilePage from "./pages/ProfilePage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

import CartPage from "./pages/buyer/CartPage";
import CheckoutPage from "./pages/buyer/CheckoutPage";
import OrderConfirmationPage from "./pages/buyer/OrderConfirmationPage";
import MyPurchasesPage from "./pages/buyer/MyPurchasesPage";

import SellerDashboardPage from "./pages/seller/SellerDashboardPage";
import SkillFormPage from "./pages/seller/SkillFormPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/skills" element={<BrowsePage />} />
                  <Route path="/skills/:id" element={<SkillDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />

                  {/* Protected Profile */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Buyer Protected */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute requireBuyer>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute requireBuyer>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orders/:id/success"
                    element={
                      <ProtectedRoute requireBuyer>
                        <OrderConfirmationPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-purchases"
                    element={
                      <ProtectedRoute requireBuyer>
                        <MyPurchasesPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Seller Protected */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute requireSeller>
                        <SellerDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/skills/new"
                    element={
                      <ProtectedRoute requireSeller>
                        <SkillFormPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/skills/:id/edit"
                    element={
                      <ProtectedRoute requireSeller>
                        <SkillFormPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
