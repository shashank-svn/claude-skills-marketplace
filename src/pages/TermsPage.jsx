import React from "react";
import { ShieldCheck, Scale, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-purple-100 rounded-2xl text-purple-600 mb-4">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Terms of{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-sm text-gray-400">Last updated: June 20, 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 shadow-sm space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-orange-500" />
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using the Claude Skills Marketplace, you agree to
              comply with and be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-pink-500" />
              2. Account Registration
            </h2>
            <p className="leading-relaxed">
              To browse, purchase, or publish skills, you may need to register
              for an account. You agree to provide accurate, current, and
              complete information and maintain the security of your password.
              You are responsible for all activities that occur under your
              account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-purple-600" />
              3. Marketplace Transactions
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2 leading-relaxed">
              <li>
                <strong>Purchasing:</strong> Buyers receive a non-exclusive,
                non-transferable license to use the purchased skill files
                (prompts, schemas, scripts) for personal or commercial
                applications.
              </li>
              <li>
                <strong>Selling:</strong> Sellers represent that they own the
                intellectual property rights to any skills they publish. Sellers
                receive payouts minus standard platform transaction commissions.
              </li>
              <li>
                <strong>Refunds:</strong> Since skills involve downloadable
                source files and code assets, refunds are handled on a
                case-by-case basis through our customer support team.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-orange-500" />
              4. Prohibited Activities
            </h2>
            <p className="leading-relaxed">
              You agree not to upload malicious scripts, copy-paste copyrighted
              materials belonging to others, reverse-engineer the platform
              architecture, or use skills to violate third-party API usage
              conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-pink-500" />
              5. Disclaimer of Warranties
            </h2>
            <p className="leading-relaxed">
              The marketplace platform and all listed skills are provided on an
              "as-is" and "as-available" basis without any warranty of any kind.
              We do not guarantee that skills will run error-free across all AI
              models or runtime environments.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
