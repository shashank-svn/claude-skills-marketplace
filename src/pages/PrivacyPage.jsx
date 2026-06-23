import React from "react";
import { ShieldCheck, Eye, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-pink-100 rounded-2xl text-pink-600 mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Privacy{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-sm text-gray-400">Last updated: June 20, 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 shadow-sm space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-orange-500" />
              1. Information We Collect
            </h2>
            <p className="leading-relaxed mb-4">
              We gather details necessary to maintain your marketplace account
              and process purchases safely:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>
                <strong>Profile Information:</strong> Name, email address,
                username, password.
              </li>
              <li>
                <strong>Billing Information:</strong> Credit card or payout
                transaction tokens managed by secure payment systems.
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, skills
                purchased/listed, and browser meta-information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-pink-500" />
              2. How We Use Your Data
            </h2>
            <p className="leading-relaxed">
              We use collected information to fulfill checkout orders, host
              seller dashboards, send invoice confirmations, provide customer
              support, and detect fraudulent listings or logins.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-purple-600" />
              3. Data Protection
            </h2>
            <p className="leading-relaxed">
              Your security is paramount. We encrypt passwords using standard
              hashing algorithms. Payments are processed directly via PCI-DSS
              compliant secure gateways, and your full card credentials are
              never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-orange-500" />
              4. Cookies & Trackers
            </h2>
            <p className="leading-relaxed">
              We use cookies to maintain your login session active. You can
              choose to disable cookies in your browser settings, though some
              features like active cart sessions might not work as intended.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-pink-500" />
              5. Your Rights
            </h2>
            <p className="leading-relaxed">
              You can access, modify, or delete your account credentials
              directly from the settings page, or contact support to permanently
              request the deletion of all data associated with your marketplace
              account.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
